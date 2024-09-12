const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:String,
    productPrice:{
        type:Number,
    },
    items:{
        type:String,
    },
    quantity:{
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