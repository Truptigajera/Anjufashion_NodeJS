const express = require("express");
const orderRoutes = express.Router();
const { verifyToken } = require("../helpers/verifyToken");
const {
    addNewOrder,
    getAllOrder,
    deleteOrder
} = require("../controller/order.controller");


orderRoutes.post("/newOrder", verifyToken, addNewOrder);
orderRoutes.get("/allOrder", verifyToken, getAllOrder);
orderRoutes.delete("/deleteOrder", deleteOrder);


module.exports = orderRoutes;