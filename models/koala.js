var mongoose = require('mongoose');

var koalaSchema = new mongoose.Schema({
  name: String,
  accent: {type: String, default: 'Australian'},
  age: {type: Number, default: Math.floor(Math.random() * 100)},
  color: {type: String, default: 'brown'},
  friends: {type: Array, default: []}
});

module.exports = mongoose.model('Koala', koalaSchema);
