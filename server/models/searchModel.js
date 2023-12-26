const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://lkasireddy915:1234@e-commerce.o3n1dk4.mongodb.net/Ecommerce?retryWrites=true&w=majority';
const dbName = 'Ecommerce';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

const searchProducts = async (query) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    const searchResults = await collection
      .find({
        $or: [
          { productName: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
        ],
      })
      .toArray();

    return searchResults;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Internal server error');
  }
};

module.exports = { searchProducts };
