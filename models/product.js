const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String },
  imageURL: { type: String },
  price: { type: Number},
  description: { type: String},
  userId: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('product', productSchema);

