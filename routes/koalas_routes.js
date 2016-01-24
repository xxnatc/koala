const koalasRouter = module.exports = exports = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const Koala = require(__dirname + '/../models/koala');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

koalasRouter.get('/api/koalas', function*() {
  yield Koala.find({}, (err, data) => {
    if (err) return handleDBError(err, this.response);
    this.body = data;
  });
});

koalasRouter.post('/api/koalas', bodyParser, function*() {
  var newKoala = new Koala(this.request.body);
  yield newKoala.save((err, data) => {
    if (err) return handleDBError(err, this.response);
    this.body = data;
  });
});

koalasRouter.put('/api/koalas/:id', bodyParser, function*() {
  var koalaData = this.request.body;
  delete koalaData._id;

  var updatePromise = new Promise((resolve) => {
    Koala.update({ _id: this.params.id }, koalaData, (err, data) => {
      if (err) return handleDBError(err, this.response);
      this.body = { msg: 'success' };
      resolve();
    });
  });

  yield updatePromise;
});

koalasRouter.delete('/api/koalas/:id', function*() {
  yield Koala.remove({ _id: this.params.id }, (err) => {
    if (err) return handleDBError(err, this.response);
    this.body = {msg: 'success'};
  });
});
