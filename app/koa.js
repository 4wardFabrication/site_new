var logger = require('koa-logger'),
    send = require('koa-send'),
    koa = require('koa'),
    app = koa();

app.use(logger());

app.use(function *() {
  this.body = 'Hello world';
});

app.listen(process.env.PORT || 3000);
