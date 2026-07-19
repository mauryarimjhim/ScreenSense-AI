const User= require("../models/User");
const bcrypt = require("bcryptjs");


exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const{ name, email , password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        });
    }
    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user    
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "user Register successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};