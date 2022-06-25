const mongoose = require('mongoose');

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string
 * 
 * mongo=mongodb+srv://<username>:<password>@cluster0.pcocp.mongodb.net/?retryWrites=true&w=majority
 */ 

const mongoDB = `mongodb+srv://${process.env['MONGO_USER']
}:${process.env['MONGO_PASSWORD']}@cluster0.pcocp.mongodb.net/${process.env['MONGO_DB']}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});


const User = connection.model('User', UserSchema);

// Expose the connection
module.exports = connection;

