const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const JsonWebToken = require('jsonwebtoken');
const path = require('path')

 


//signup or register

exports.singup = async (req, res) => {
    try {
      let imagePath = "";
      let user = await User.findOne({ email: req.body.email, isDelete: false });
      if (user) {
        return res.json({ msg: "user is aleardy exists..." });
      }
      
      console.log('Password:', req.body.password); // Debugging line
      console.log('profileimagew:', req.body.ProfileImage); // Debugging line
      
      let hashPassword = await bcrypt.hash(req.body.password,10);
      if(req.file){
        imagePath = req.file.path.replace(/\\/g,"/");
    }
      user = await User.create({
        ...req.body,
        password: hashPassword,
        profileImage : imagePath
      })
      console.log("user",user);
      user.save();
      res.status(201).json({ msg: "User is register", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  //get all user
exports.getAllUsers =async (req,res)=>{
    try {
        let users = await User.find({isDelete:false});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal server Error"})      
    }
};
/* ----------------------Get User ------------------------- */

exports.getUser = async(req,res)=>{
  try {
       let user = await User.findById(req.query.userId);
       if(!user){
          res.status(404).json({msg:"User not found"})
       }
       res.status(200).json(user)
  } catch (error) {
      console.log(error);
      res.status(500).json({msg:"internal Server error"})
  }
}

//for login user

exports.Login = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email,isDelete:false});
        if (!user){
            return res.status(400).json({message:"User Not /found"});
        }
        let matchpassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchpassword){
            return res.status(400).json({message:"Email or password not matched..."});
        }

        let token = await JsonWebToken.sign({
            userId:user._id},process.env.JWT_SECRET);
            res.status(200).json({message:"Login success",token});
            console.log("hello...");
            
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* ----------------------Update Users ------------------------- */

exports.updateUser = async(req,res)=>{
  try {
    let user = req.user;
    user =  await User.findByIdAndUpdate(
        user._id,
        {$set: req.body},
        {new:true}
      )
      user.save();
      res.status(201).json({msg:"User Updated...",user})
  } catch (error) {
    console.log(error);
    res.status(500).josn({msg:"Internal Server Error"})
  }
};



