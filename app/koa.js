var fs = require('fs'),
    jade = require('jade'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    route = require('koa-route'),
    parse = require('co-body'),
    koa = require('koa'),
    Mailgun = require('mailgun-js'),
    Emailer = require('./lib/emailer'),
    AssetHandler = require('./lib/asset_handler'),

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
  var data = yield parse(this),
      mailgun = Mailgun({apiKey: apiKey, domain: domain});
  data.to = toEmailAddress;
  this.status = yield Emailer(data, mailgun).send();
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
    var path = root + this.path;

    if(Object.keys(fileCache).indexOf(path) > -1) {
      this.type = fileCache[path].type;
      this.body = fileCache[path].body;
    } else {
      var fileHandler = AssetHandler(path);

      if (fileHandler.next()) {
        yield next;
      } else {
        fileCache[path] = {
          type: fileHandler.getType(),
          body: fileHandler.getBody()
        };
        this.type = fileCache[path].type;
        this.body = fileCache[path].body;
      }
    }
  });
}

app.use(function *() {
  yield send(this, root + this.path);
});

app.listen(port);
console.log('Listening on port ' + port);
