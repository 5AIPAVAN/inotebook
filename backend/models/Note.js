//DONOT USE :- import mongoose from 'mongoose'; // from mongoose website docs
// UPDATED WAY IS TO USE require
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
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
        type: String,
        default:"general"
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

// to use this schema - need to export
// NoteSchema is exported as 'note_schema'
module.exports=mongoose.model('note_schema',NoteSchema);