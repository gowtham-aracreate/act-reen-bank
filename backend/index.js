const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For password hashing

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/Reen-Bank");
      console.log("DB Connected");
};
connectDB();


// User Schema
const UserSchema = new mongoose.Schema({
  username: {type: String},
  email: { type: String, unique: true },
  password: {type: String},
  acc_no: {type: Number,required: false },
  phone_no: Number,
  gender: String,
});

// User Model
const User = mongoose.model("UserDetails", UserSchema);


// Register User
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)
    User.insertOne(req.body);
    return res.send("User Registered Successfully");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Account Details Page
app.post('/acc_details', async (req, res) => {
  
  try{
    const {acc_no, phone_no, gender} = req.body;

     // Create Account
    const new_acc = await User.create({
      acc_no,
      phone_no,
      gender
    });
  res.status(201).json({success: true, message: "Account Details Added Successfully", acc: new_acc})
  } catch (error) {
    console.error("Error in Adding Account Details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Login Page
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, message: "Invalid User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.send({ message: 'Login successful', redirectUrl: '/overview' });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).send('Error logging in user');
  }
});


// Profile page
app.post('/profile', async (req, res)=>{

  const data = req.body;
  const existingUser = await User.findById(data.id);
  if(!existingUser){
    return res.json({success: false, message: "User does not exist"});
  }

  // Editing Option in Profile Page
  const updatedUser = await User.updateOne({_id: data.id}, {phone_no : data.phone_no, gender : data.gender} );

  return res.status(200).json({message : "User Updated Successfully", success: true, data : updatedUser})
  
})


app.get('/get_user', async (req, res) => {
  const data = await User.find();
  res.status(200).json(data)
})


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
