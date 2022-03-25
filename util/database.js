const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;


const connectToDB = (callback) => {
  const uri = "mongodb+srv://falguniparghi:YXgWJZysasxsIQpe@cluster0.6drto.mongodb.net/shop?retryWrites=true&w=majority"
  MongoClient.connect(uri).then(
    client => {
      console.log('Connected');
      db = client.db();
      callback();
    }
  ).catch(err => {
    console.log(err);
  })
}

const getDb = () => {
  if(db){
    return db;
  }
  return 'No Database connected';
}

exports.connectToDB = connectToDB;
exports.getDb = getDb;