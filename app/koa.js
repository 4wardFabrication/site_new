var fs = require('fs'),
    path = require('path'),
    jade = require('jade'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    route = require('koa-route'),
    parse = require('co-body'),
    koa = require('koa'),
    UglifyJS = require('uglify-js'),
    CSSMin = require('cssmin'),
    Mailgun = require('mailgun-js'),
    Emailer = require('./lib/emailer'),

    app = koa(),
    env = process.env.NODE_ENV || 'development',
    domain = process.env.MAILGUN_API_DOMAIN,
    apiKey = process.env.MAILGUN_API_KEY,
    toEmailAddress = process.env.TO_EMAIL_ADDRESS,
    root = __dirname + '/www',
    port = process.env.PORT || 3000,
    fileCache = {};

app.use(logger());

app.use(route.post('/api/emailer', function *() {
  var data = yield parse(this);
  data.to = toEmailAddress;
  var emailer = new Emailer(data, Mailgun({apiKey: apiKey, domain: domain}));
  if (emailer.isValid()) {
    try {
      yield emailer.send();
      this.status = 200;
    } catch(err) {
      console.log(err);
      this.status = err.statusCode;
    }
  } else {
    this.status = 404;
  }

}));

app.use(function *(next) {
  var candidatePath = root + this.path;
  try {
    var stats = fs.statSync(candidatePath);
    if(stats.isDirectory()) {
      this.body = jade.renderFile(candidatePath + '/index.jade');
    }

    if(stats.isFile()) {
      yield next;
    }
  } catch(err) {
    this.status = 404;
    this.body = 'Not Found';
  }
});

if(env === 'production') {
  app.use(function *(next) {
    if(path.extname(this.path) === '.js') {
      if(Object.keys(fileCache).indexOf(this.path) == -1) {
        fileCache[this.path] = UglifyJS.minify(root + this.path).code;
      }
      this.type = 'text/javascript; charset=utf-8';
      this.body = fileCache[this.path];
    } else {
      yield next;
    }
  });

  app.use(function *(next) {
    if(path.extname(this.path) === '.css') {
      if(Object.keys(fileCache).indexOf(this.path) == -1) {
        var css = fs.readFileSync(root + this.path, 'utf8');
        fileCache[this.path] = CSSMin(css);
      }
      this.type = 'text/css; charset=utf-8';
      this.body = fileCache[this.path];
    } else {
      yield next;
    }
  });
}

app.use(function *() {
  yield send(this, root + this.path);
});

app.listen(port);
console.log('Listening on port ' + port);
