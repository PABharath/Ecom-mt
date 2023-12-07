const { MongoClient, ObjectId } = require('mongodb');

class ProductModel {
  constructor() {
    this.uri = 'mongodb://127.0.0.1:27017';
    this.dbName = 'Ecommerce-mvc';
  }

  async connect() {
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection('products');
  }

  async getAllProducts() {
    return this.collection.find().toArray();
  }

  async getProductsByCategory(category) {
    return this.collection.find({ category: category }).toArray();
  }

  async getProductById(productId) {
    return this.collection.findOne({ _id: new ObjectId(productId) });
  }

  async closeConnection() {
    await this.client.close();
  }
}

module.exports = ProductModel;
