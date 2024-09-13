const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')

const otpGenerator = require('../helpers/otpMailsender')




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

    let hashPassword = await bcrypt.hash(req.body.password, 10);
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, "/");
    }
    user = await User.create({
      ...req.body,
      password: hashPassword,
      profileImage: imagePath
    })
    console.log("user", user);
    user.save();
    res.status(201).json({ msg: "User is register", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//get all user
exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find({ isDelete: false });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" })
  }
};
/* ----------------------Get User ------------------------- */

exports.getUser = async (req, res) => {
  try {
    let user = await User.findById(req.query.userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal Server error" })
  }
}

//for login user

exports.Login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    if (!user) {
      return res.status(400).json({ message: "User Not /found" });
    }
    let matchpassword = await bcrypt.compare(req.body.password, user.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "Email or password not matched..." });
    }

    let token = await jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login success", token });
    console.log("hello...");

  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ----------------------Update Users ------------------------- */

exports.updateUser = async (req, res) => {
  try {
    let user = req.user;
    user = await User.findByIdAndUpdate(
      user._id,
      { $set: req.body },
      { new: true }
    )
    user.save();
    res.status(201).json({ msg: "User Updated...", user })
  } catch (error) {
    console.log(error);
    res.status(500).josn({ msg: "Internal Server Error" })
  }
};

//password Chnage//
exports.userPasswordChange = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, conformPassword } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" })
  }
}


//OTP genertRATE//
exports.userForgotPasword = async (req, res) => {
  try {
    let user = await UserServices.findOneUser({
      email: req.body.email,
      isDelete: false
    });
    if (!user) {
      return res.json({ message: 'User Not Found....' });
    }
    let otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const mailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to: user.email,
      subject: 'Forgot Password Email',
      text: `Your Forgot password otp is ${otp} valid only 5 minutes.`
    };
    await otpMailSender(mailOptions);
    res.send('Otp Send SuccessFully To Your Email.');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



