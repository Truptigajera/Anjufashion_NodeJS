const Order = require("../model/order.model");
const Cart = require("../model/cart.model");

/* ---------------------Cart Checkout (Order Placed)-------------- */
exports.addNewOrder = async (req, res) => {
    try {
        console.log("user: ->>>>", req.user);
        
        let cart = await Cart.find({ user: req.user._id, isDelete: false }).populate("productId");
        console.log("Cart: ------> ", cart);

        // Check if the cart is empty
        if (cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        let orderItem = cart.map((item) => {
            if (!item.productId) {
                throw new Error('Product not found for cart item');
            }

            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.productPrice,
                totalAmount: item.quantity * item.productId.productPrice
            };
        });

        console.log("Order Items: -----> ", orderItem);

        let amount = orderItem.reduce((total, item) => total + item.totalAmount, 0);
        
        let order = await Order.create({
            user: req.user._id,
            items: orderItem,
            paidAmount: amount
        });
        console.log(order);
        
        await Cart.updateMany({ user: req.user._id, isDelete: false }, { isDelete: true });
        res.json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllOrder = async (req, res) => {
    try {
        let order = await Order.find({ user: req.user._id, isDelete: false });
        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        let order = await Order.findById({ _id: req.query.orderId, isDelete: false });
        if (!order) {
            return res.status(404).json({ message: "Order Not Founded" });
        }

        order = await Order.findByIdAndUpdate(order._id, { isDelete: true }, { new: true });
        res.status(200).json({ message: "Oreder Deleted SuccessFully", order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};