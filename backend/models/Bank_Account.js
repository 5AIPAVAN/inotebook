//DONOT USE :- import mongoose from 'mongoose'; // from mongoose website docs
// UPDATED WAY IS TO USE require
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = new Schema({
    //  ex:-  title: String, String is shorthand for {type: String}

    user : {  // EVERY NOTE IS ASSOCIATED WITH A USER(therefore every note contains -> owners user id)
        type:mongoose.Schema.Types.ObjectId,   // LIKE FOREIGN KEY FROM User model
        ref:'User' 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: Number,
        default:0
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

// Create the Bank_Account model
const Bank_Account = mongoose.model('Bank_Account', AccountSchema);

module.exports = Bank_Account;