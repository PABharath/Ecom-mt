const { MongoClient } = require('mongodb');

class SearchModel {
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

  async searchProducts(query) {
    return this.collection
      .find({
        $or: [
          { productName: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          // add other fields you want to search here
        ],
      })
      .toArray();
  }

  async closeConnection() {
    await this.client.close();
  }
}

module.exports = SearchModel;
