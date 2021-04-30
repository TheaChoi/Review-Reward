const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
},
{ collection: 'Account' });

// generates hash
AccountSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
AccountSchema.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports =  mongoose.model('Account', AccountSchema);