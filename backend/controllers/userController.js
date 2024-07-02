import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//login user function

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }
    const token = createToken(user._id);
    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

//generate token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user function

const registerUser = async (req, res) => {
  //getting the data from the body
  const { fullName, password, email } = req.body;
  try {
    //check if the user is already registered with the email
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email format ex:company@gmail.com",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a password that have more than 8 digits",
      });
    }
    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating a new user
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    console.log(user);
    const token = createToken(user._id);
    //sending token
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all users

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error while getting users",
    });
  }
};

export { loginUser, registerUser, getUsers };
