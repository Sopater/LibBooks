const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email_verified: {
        type: String,
        default: null,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    alamat: {
        type: String,
        default: null,
    },
    no_hp: {
        type: Number,
        default: null,
    },
    tgl_lahir: {
        type: Date,
        default: null,
    },
    deskripsi: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    }
});

module.exports = mongoose.model('User', userSchema);