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
    await mongoose.connect("mongodb://localhost:27017/Reen-Bank"); 
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};
connectDB();


// User Schema
const UserSchema = new mongoose.Schema({
  username: {type: String},
  email: { type: String, unique: true },
  password: {type: String},
  acc_no: {type: Number, required: true, unique: true},
  phone_no: {type: Number, required: true, unique: true},
  gender: {type: String, required: true}
});

// User Model
const User = mongoose.model("UserDetails", UserSchema);


//REGISTER PAGE
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Save hashed password
    });


    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// ADD ACCOUNT DETAILS PAGE
app.post("/acc_details", async (req, res) => {
  try {
    const {acc_no, phone_no, gender } = req.body;

  // Validate input
  if(!acc_no || !phone_no || !gender) {
    return res.status(400).json({ success: false, message: "Please fill all the fields" });
  }

  //check if account number or phone number already exists
  const existingAccount = await User.findOne({ $or:[{ acc_no},{phone_no}]    
   });
  if (existingAccount) {
    return res.status(400).json({ success: false, message: "Account number or Phone number already exists" });
  }

  const newAccount = await User.create({
    acc_no,
    phone_no,
    gender,
  });

    res.status(201).json({ success: true, message: "Account details updated successfully", user });
  } catch (error) {
    console.error("Error in adding account details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// LOGIN PAGE
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // If credentials are valid, return a success response
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// UPDATE PAGE
app.post("/profile", async (req, res) => {
  try {
    const { id, phone_no, gender } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update profile details
    user.phone_no = phone_no;
    user.gender = gender;
    await user.save();

    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get All Users (for testing purposes)
app.get("/get_user", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});