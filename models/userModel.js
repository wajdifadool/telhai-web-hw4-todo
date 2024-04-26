/**
 * By default, Mongoose pluralizes the model name to determine the collection name in MongoDB.
 For example, if you have a Mongoose model named User, Mongoose will automatically map this model to the users collection in MongoDB.
Similarly, if you have a Mongoose model named Todo, Mongoose will automatically map this model to the todos collection in MongoDB.
This is a convention used by Mongoose for determining the collection name. Mongoose does this automatically, so you don't have to specify the collection name explicitly most of the time.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema, 'users');
