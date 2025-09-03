const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri; // Set the MONGO_URI for the application to use
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
