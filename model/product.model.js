const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:String,
    productPrice:{
        type:Number,
    },
    items:{
        type:String,
    },
    quntity:{
        type:Number,
    },
    rating:{
        type:String,
    },
    isDelete:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('products',productSchema)