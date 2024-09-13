const express = require('express');
const userRoutes = express.Router();
const {singup, 
    getAllUsers, 
    Login,
    updateUser,
    getUser,
    userPasswordChange,
    userForgotPasword
}=require('../controller/user.controller');
const {upload} = require('../helpers/userimages');
const { verifyToken } = require('../helpers/verifyToken');
 


userRoutes.post('/register',upload.single('profileImage'),singup)
userRoutes.get("/", getAllUsers);
userRoutes.post('/login',Login);
userRoutes.put('/update',verifyToken,updateUser);
userRoutes.get('/getuser',getUser);
userRoutes.put("/change", verifyToken, userPasswordChange);
userRoutes.post("/forgotPassword", userForgotPasword);



module.exports = userRoutes;