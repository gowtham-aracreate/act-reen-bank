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
  await mongoose.connect("mongodb://localhost:27017/Reen-Bank", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connected");
};
connectDB();

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

// User Model
const User = mongoose.model("UserDetails", UserSchema);

// Register User
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: "Internal server error" });
  }

  app.get('/get_user', async (req, res) => {
    const data = await User.find();
    res.json(data)
  })
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
