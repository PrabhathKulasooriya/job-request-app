import UserModel from "../models/userModel.js";
import JobRequestModel from "../models/jopRequestModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Register New User
export const registerUser = async (req, res) =>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ success:false, message: "Please fill all the fields"});
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success:false,message: "Please enter a valid email address" });
    }

    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({ success:false, message: "User with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        
        const user = await newUser.save();
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});
        return res.status(201).json({success:true, message: "User registered successfully", token, user});

    } catch(error){
        return res.status(500).json({success:false, message: "Error occurred while registering user", error: error.message});
    }

}


//Login User
export const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({ success:false, message: "Please fill all the fields"});
    }
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({ success:false, message: "Invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ success:false, message: "Wrong password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});
        return res.status(200).json({success:true, message: "User logged in successfully", token, user});

    }catch(error){
        return res.status(500).json({success:false, message: "Error occurred while logging in user", error: error.message});
    }
}


//User's jobs
export const getUserJobs = async (req, res) => {
  const userId = req.user;


  try {
    const jobs = await JobRequestModel.find({ postedBy: userId }).populate("assignedTo","name email",);
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching jobs",
        error: error.message,
      });
  }
};

//Accepted jobs
export const getAcceptedJobs = async (req,res) =>{
    const userId = req.user;
    try{
        const jobs = await JobRequestModel.find({assignedTo: userId}).populate("postedBy", "name email");
        return res.status(200).json({success:true, jobs});
    }catch(error){
        return res.status(500).json({success:false, message: "Error occurred while fetching accepted jobs", error: error.message});
    }
}


