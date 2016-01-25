var koa = require('koa');
var app = koa();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/koalas_dev');

var koalasRouter = require(__dirname + '/routes/koalas_routes');

app.use(koalasRouter.routes());

var PORT = process.env.PORT || 3000;
module.exports = exports = app.listen(PORT, () => console.log('server up on ' + PORT));
