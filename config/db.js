/**
 * Connect to the MongoDB database using Mongoose.
 *
 * This module exports an asynchronous function that connects to the MongoDB database
 * specified by the MONGO_URI environment variable. It uses Mongoose to establish the connection
 * and logs a message to the console once the connection is established.
 *
 * https://mongoosejs.com/
 */
// Import the Mongoose library for MongoDB database interaction.
const mongoose = require('mongoose');

const connectTODb = async () => {
  const uri = process.env.MONGO_URI;
  const con = await mongoose.connect(uri);
  console.log(`Connectd to DB:  ${con.connection.host}`);
};

// Set the 'strictQuery' option to 'true' for Mongoose (optional).
mongoose.set('strictQuery', true);

// Export the 'connectDB' function to make it available for use in other parts of your code.

module.exports = connectTODb;
