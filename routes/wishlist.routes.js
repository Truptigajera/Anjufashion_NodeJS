const express = require('express');
const favoriteRoutes = express.Router();
 
const { verifyToken } = require('../helpers/verifyToken');

const {
    addFavorite,
    deleteFavorite,
    getallFavorite
} = require('../controller/wishlist.controller')

favoriteRoutes.post('/add-favorite',verifyToken,addFavorite)
favoriteRoutes.delete('/delete/',verifyToken,deleteFavorite)
favoriteRoutes.get('/getall',verifyToken,getallFavorite)

module.exports = favoriteRoutes;