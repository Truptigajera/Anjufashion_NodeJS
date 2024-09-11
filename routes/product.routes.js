const express = require('express')
const productRoutes = express();
const {verifyToken} = require('../helpers/verifyToken')

const {
    addNewProduct, 
    getAllproduct, 
    deleteproduct,
    getProduct

} = require('../controller/product.controller')

productRoutes.post('/addproduct',addNewProduct)

productRoutes.get('/getall',verifyToken,getAllproduct)

productRoutes.delete('/delete',deleteproduct)

productRoutes.get('/get',getProduct)


module.exports = productRoutes;