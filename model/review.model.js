const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDelete:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("reviews", reviewSchema);