var fs = require('fs'),
    path = require('path'),
    jade = require('jade'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    koa = require('koa'),
    UglifyJS = require('uglify-js'),
    app = koa(),

    env = process.env.NODE_ENV || 'development',
    root = __dirname + '/www';
    port = process.env.PORT || 3000,
    fileCache = {};

app.use(logger());

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

app.use(function *(next) {
  if(env === 'production' && path.extname(this.path) === '.js') {
    if(Object.keys(fileCache).indexOf(this.path) == -1)
      fileCache[this.path] = UglifyJS.minify(root + this.path).code;
    this.body = fileCache[this.path];
  } else {
    yield next;
  }
});

app.use(function *() {
  yield send(this, root + this.path);
});

app.listen(port);
console.log('Listening on port ' + port);
