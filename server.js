var koa = require('koa');
var app = module.exports = koa();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/koalas_dev');

var koalasRouter = require(__dirname + '/routes/koalas_routes');

app.use('/api', koalasRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up'));
