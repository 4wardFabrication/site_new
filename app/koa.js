var fs = require('fs'),
    jade = require('jade'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    koa = require('koa'),
    app = koa(),

    port = process.env.PORT || 3000;

app.use(logger());

app.use(function *() {
  var candidatePath = __dirname + '/www' + this.path;
  try {
    var stats = fs.statSync(candidatePath);
    if(stats.isDirectory()) {
      this.body = jade.renderFile(candidatePath + '/index.jade');
    }

    if(stats.isFile()) {
      console.log(candidatePath);
      yield send(this, candidatePath);
    }
  } catch(err) {
    this.status = 404
    this.body = 'Not Found';
  }
});

app.listen(port);
console.log('Listening on port ' + port);
