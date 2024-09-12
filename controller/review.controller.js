const Review = require('../model/review.model');

exports.createreview = async (req, res) => {

    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;
        const review = Review.create({ userId, productId, rating, comment });
        res.status(201).json({ message: 'Review create successfully...', review });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.getproductreviews = async (req, res) => {

    try {
        const { productId } = req.query;
        const reviews = await Review.find({ productId, isDelete: false }).populate('userId', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.getuserreviews = async (req, res) => {

    try {
        const userId = req.user._id;
        const reviews = await Review.find({ userId, isDelete: false }).populate('productId', 'productname');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your reviews', error });
    }

};


exports.updatereview = async (req, res) => {

    try {
        const { reviewId } = req.query;
        const { rating, comment } = req.body;
        const userId = req.user._id;
        const review = await Review.findOne({ _id: reviewId, userId, isDelete: false });
        console.log(reviewId);
        if (!review) { return res.status(404).json({ message: 'Review not found...' }); }
        if (!userId) { return res.status(403).json({ message: 'You can not update this review...' }); }
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();
        res.status(200).json({ message: 'Review updated successfully...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.deletereview = async (req, res) => {

    try {
        const { reviewId } = req.query;
        const userId = req.user._id;
        console.log(reviewId);
        const review = await Review.findOne({ _id: reviewId, userId, isDelete: false });
        if (!review) { return res.status(404).json({ message: 'Review not found...' }); }
        if (!userId) { return res.status(403).json({ message: 'You can not delete this review...' }); }
        review.isDelete = true;
        await review.save();
        res.status(200).json({ message: 'Review soft deleted successfully...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};