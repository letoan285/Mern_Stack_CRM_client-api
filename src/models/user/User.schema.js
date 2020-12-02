const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true
    },
    company: {
        type: String,
        maxlength: 100
    },
    address: {
        type: String,
        maxlength: 100,
        required: true
    },
    phone: {
        type: String,
        maxlength: 100
    },
    email: {
        type: String,
        maxlength: 100,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    }
});

module.exports = {
    UserSchema: mongoose.model('User', UserSchema)
};