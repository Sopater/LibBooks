const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    publish_date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    }
})