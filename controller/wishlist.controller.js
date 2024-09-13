const Wishlist = require('../model/wishlist.model'); // Correct import for the wishlist model
const Product = require('../model/product.model'); // Correct import for the product model

// Add a product to the favorite list
exports.addFavorite = async (req, res) => {
    try {
        const { productId } = req.body; // Correct field name based on the schema
        console.log("Product ID from request:", productId); // Debugging log
        
        // Check if the product exists
        const product = await Product.findById(productId);
        console.log("Fetched product from DB:", product); // Debugging log

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Check if the product is already in the user's favorite list
        let favorite = await Wishlist.findOne({ productId: productId, user: req.user._id, isDelete: false });
        if (favorite) {
            return res.status(400).json({ message: "Item is already in the favorite list." });
        }

        // Add product to the favorite list
        favorite = await Wishlist.create({
            productId,
            user: req.user._id,
        });

        res.status(201).json({ message: "Item is added to the favorite list", favorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a product from the favorite list
exports.deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the favorite item and mark it as deleted
        let favorite = await Wishlist.findOneAndUpdate(
            { _id: id, user: req.user._id, isDelete: false },
            { $set: { isDelete: true } },
            { new: true }
        );

        if (!favorite) {
            return res.status(404).json({ message: "Item not found in the favorite list." });
        }

        res.json({ message: "Product item is deleted from the favorite list", favorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all favorite products for the user
exports.getallFavorite = async (req, res) => {
    try {
        // Find all favorite items for the user that are not deleted
        const favorites = await Wishlist.find({ user: req.user._id, isDelete: false }).populate('productId');

        if (favorites.length === 0) {
            return res.status(404).json({ message: "No favorite products found." });
        }

        res.status(200).json({ message: "Favorite products fetched successfully.", favorites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
