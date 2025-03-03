const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For password hashing

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Reen-Bank", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
connectDB();

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  acc_no: { type: Number, unique: true, default: null }, // acc_no is optional
  phone_no: { type: Number, default: null },
  gender: { type: String, default: null },
});

// User Model
const User = mongoose.model("UserDetails", UserSchema);

// Register User
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, phone_no, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user without acc_no
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone_no,
      gender,
    });

    await newUser.save();

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


// LOGIN PAGE
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

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

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    res.send({ message: 'Login successful', redirectUrl: '/overview' });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Protected Router (For Overview)
const verifyToken = (req, res, next) => {
  const token = req.headers['Authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ success: false, message: 'Unauthorized' });
  //   }

  //   req.userId = decoded.id;
  //   next();
  // });
}; 

app.get('/overview', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Welcome to the overview page', user: req.user });
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
