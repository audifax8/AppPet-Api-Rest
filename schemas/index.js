const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
    {
        id: { type: String },
        userName: { type: String },
        email: { type: String },
        password: { type: String },
        phone: { type: Number },
        address: { type: String },
        isAdmin: { type: Boolean, default: false },
        terms: { type: Boolean, default: true },
    }
);
const userSchema = mongoose.model('User', User);

const Book = new Schema(
    {
        id: { type: Number },
        name: { type: String },
        author: { type: String },
        title: { type: String },
        description: { type: String },
        read: { type: Boolean, default: false },
    }
);
const bookSchema = mongoose.model('Book', Book);

const Pet = new Schema(
    {
        id: { type: String },
        name: { type: String },
        userId: { type: String },
        description: { type: String },
        isAdopted: { type: Boolean, default: false },
        gender: { type: Boolean },
        imgUri: { type: String },
        creationDate: { type: Number },
        adoptedDate: { type: Number },
        petType: { type: String },
    }
);
const petSchema = mongoose.model('Pet', Pet);

module.exports = {
    user: userSchema,
    book: bookSchema,
    pet: petSchema
};