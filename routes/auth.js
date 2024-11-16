//We are using express for out backend
const express = require("express");

//Since auth is a route which means it is a pathway used to make our index js more modular
const router = express.Router();

//It is a model which gives shape to the data entered by enforcing some constraints
const User = require("../models/User");

//bcrypt is used to store password in DB in a hashed format with a salt which is nothing but a random value
const bcrypt = require('bcryptjs');

//JWT is used to authenticate
var jwt = require('jsonwebtoken');

//Module named fetchuser which is a middleware acts as a middleman to retrive user data from token which is taken from the user after login
var fetchuser = require("../middleware/fetchuser");

//Used to validate the input fields like is email having correct format or not
const { body, validationResult } = require("express-validator");

//Note:: We will provide token to the user post login (JWT Auth Token)
//We are using Token in order to save login time and auth user efficiently
//JWT secret is used to provide additional security while auth
//Ideally put it in an env var
const JWT_SECRET =process.env.JWT_SECRET;
//
//
//
//ROUTE 1
//Post method is used by the user to send data to the backend which process the data and store it in the db
//Create a User using: POST "/api/auth/createuser" No Login Required (sign up in layman)
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=true;
    //If there are errors, return BAD request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "Sorry user with this email already exists" });
      }
      //Create a salt which is used to defeat rainbow table as it is a random value added to the hash 
      const salt=await bcrypt.genSalt(10);
      //Create secured password
      const secPass= await bcrypt.hash(req.body.password,salt);//error in await can occur if we are not getting its argument values async way
      //Create a new user
      //user will contain all the fields of mongoDB collection of user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //Retriving data via id which is indexed will be fastest
      const data = {
        user:{
          id:user.id
        }
      }
      //Generates Token -- JWT SECRET helps in identifying the real id of user
      const authToken=jwt.sign(data,JWT_SECRET);
      //Sending Token to the user containing id for quick access and auth
      //we need to convert data into obj so that json function takes it as json
      res.json({success,authToken});
    } catch (error) {
      success=false;
      //Since any kind of random error can occur apart from wrong fields filled by user it will help to notify that
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);
//
//
//
//ROUTE 2
//Authenticate a User using: POST "/api/auth/login" No Login Required(login of existing user)
router.post(
  "/login",
  [//I will not allow login to occur successfully without taking valid email from user side How? see line 88
    body("email", "Enter a valid email").isEmail(),
    //I will not allow login to occur if password entered is blank
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
    let success=false;
    //If there are errors, return BAD request and the errors
    const errors = validationResult(req);
    //if array of errors is not empty that means there are errors that means i will return from line 92
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //For accessing DB i will destructure req.body which is nothing but the data that user entered while login 
    const {email,password}=req.body;
    try {
      //I will try to find whether user exists or not in DB
      //Will find user using below method based on email object
      let user=await User.findOne({email});
      if(!user){
        //Code 400 means error 
        success=false;
        return res.status(400).json({success,error:"Please try to login using correct credentials"});
      }
      //now since email exists lets compare whether password is correct or not
      //remember user.password is hashed+salted form of real password hence we require to used below method
      const passwordCompare=await bcrypt.compare(password,user.password);
      //Above is a boolean variable
      if(!passwordCompare){
        //If password entered is wrong simply return that input to login is incorrect
        success=false;
        return res.status(400).json({success,error:"Please try to login using correct credentials"});
      }
      //What is payload(var data)?-imp info for either receiving or sending info
      const data={
        user:{
          id:user.id
        }
      }
      //Generates Token -- JWT SECRET helps in identifying the real id of user
      //Basically we check whether user is authorized then send him/her token
      const authToken=jwt.sign(data,JWT_SECRET);
      //Send authToken in obj format so that it gets converted into json 
      success=true;
      res.json({success,authToken});
    } catch (error) {
      //Since any kind of random error can occur apart from wrong fields filled by user it will help to notify that
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);
//
//
//
//ROUTE 3
//Get loggedin user details using :: POST "/api/auth/getuser". Login Required
router.post("/getuser",fetchuser,async (req, res) => {
    try {
      //we need to fetch user id from the token which user gets so that we can display all user details to user except password
      //We need to create a middleware for all general login requiring functionalities so that we get user id
      const userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      //Since any kind of random error can occur apart from wrong fields filled by user it will help to notify that
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);
//This is used to export the module to index js 
module.exports = router;