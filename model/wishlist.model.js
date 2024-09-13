const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('wishlist',favoriteSchema);