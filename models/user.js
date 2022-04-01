const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: {type: String},
  cart: {
    items: [{
      productId: { type: schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, require: true }
    }
   ]
  }
  } )

  userSchema.methods.addToCart = function(product) {
    
    const cartProductIndex = this.cart.items.findIndex(cp => {
       return cp.productId.toString() === product._id.toString();
     });
     let newQuantity = 1;
     const updatedCartItems = [...this.cart.items];
 
     if (cartProductIndex >= 0) {
       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
       updatedCartItems[cartProductIndex].quantity = newQuantity;
     } else {
       updatedCartItems.push({
         productId: product._id,
         quantity: newQuantity
       });
     } 

     const updatedcart = {
       items: updatedCartItems
     }

     this.cart  = updatedcart;
     return this.save();
   }

   userSchema.methods.deleteCartItems = function(productId){
    const updatedCartItems = this.cart.items.filter(cp => {
      return cp.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();

   }

   userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
  };
 
   module.exports = mongoose.model('user', userSchema);
