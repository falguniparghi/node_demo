const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {

  constructor(title, price, imageURL, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
    this.id = id ? id : '' ;
    this.userId = userId ? userId : '' ;
  }

  save = () => {
    const db = getDb();
    let dbOperation;
    if (this.id) {
      dbOperation = db.collection('products').updateOne({'_id': this.id},{$set:this})
    } else {
      dbOperation = db.collection('products').insertOne(this)
    }
    return dbOperation.then(result => {
      console.log(result);
      console.log('Product Added Successfully');
    })
    .catch(err => {
      console.log(err);
    });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchByID(id) {
    const db = getDb();
    return db.collection('products').find({'_id': new mongodb.ObjectId(id)}).next()
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteByID(id) {
    const db = getDb();
     return db.collection('products').deleteOne({'_id':new mongodb.ObjectId(id) })
     .then(result => {
       return result;
     })
     .catch(err => console.log(err));

  }
}

module.exports = Product;
