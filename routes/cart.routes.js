const express = require("express");
const cartRoutes = express.Router();
const{
    addtoCart,
    getAllCarts,
    updateCart 
}=require("../controller/cart.controller");

const{verifyToken}=require('../helpers/verifyToken');

cartRoutes.post("/addcart",verifyToken,addtoCart);
cartRoutes.get("/getall",verifyToken,getAllCarts);
cartRoutes.put("/update",verifyToken,updateCart);




module.exports=cartRoutes;