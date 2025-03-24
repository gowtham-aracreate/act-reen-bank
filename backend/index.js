const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For password hashing
const nodemailer = require("nodemailer");

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
  username: { type: String },
  email: { type: String },
  password: { type: String },
  acc_no: { type: Number },
  phone_no: { type: Number },
  gender: { type: String, }
});

// User Model
const User = mongoose.model("UserDetails", UserSchema);

// OTP Schema (Stores OTPs separately)
const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Each email has one OTP record
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true } // Expiry time for OTP
});

const Otp = mongoose.model("Otp", OtpSchema);

// Nodemailer Transporter (Replace with your credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "reenbankact@gmail.com",  // Replace with your Gmail
    pass: "rwgvvovgrqkpmbli",     // Replace with your App password
  },
});

// Function to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Route (For registration & email change)
app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Store OTP separately
    await Otp.findOneAndUpdate(
      { email },
      { otp, otpExpires: expiry },
      { upsert: true, new: true }
    );

    // Send OTP email
    await transporter.sendMail({
      from: "reenbankact@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

// Verify OTP Route
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Received email:", email);
    console.log("Received OTP:", otp);

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      console.log("OTP not found for email:", email);
      return res.status(400).json({ success: false, message: "OTP not found. Please request a new one." });
    }

    console.log("Stored OTP:", otpRecord.otp);

    if (otpRecord.otp.toString() !== otp.toString()) {
      console.log("Entered OTP does not match stored OTP");
      return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
    }

    // Mark user as verified
    await User.findOneAndUpdate({ email }, { verified: true });

    // Delete OTP after verification
    await Otp.deleteOne({ email });

    res.json({ success: true, message: "OTP Verified!" });

  } catch (error) {
    console.error("Server error in /verify-otp:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});


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
      password: hashedPassword, //save hashed password
    });
    console.log(user_id = newUser._id);//we are getting the user_id from the database
    //delete newUser.password;

    res.status(201).json({ success: true, message: "User registered successfully", user_id: newUser._id });//we are sending the user_id to the frontend

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// ADD ACCOUNT DETAILS PAGE
app.post("/acc_details", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    let { user_id, acc_no, phone_no, gender } = req.body;
    acc_no = parseInt(acc_no);     // Convert to number
    phone_no = parseInt(phone_no); // Convert to number

    // Validate input
    if (!user_id || !acc_no || !phone_no || !gender) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const user = await User.findById(user_id);//findById is to find the user by id , we are getting the user_id from the frontend
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    //check if account number or phone number already exists
    const account = await User.findOne({ acc_no });//findOne is to find the user by account number
    const phone = await User.findOne({ phone_no });
    if (account || phone) {
      return res.status(400).json({
        success: false,
        message: "Account number or Phone number already exists"
      });
    }

    user.acc_no = acc_no;
    user.phone_no = phone_no;
    user.gender = gender;
    await user.save();


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
    res.status(200).json({
      success: true, message: "Login successful",
      user_id: user._id,
      username: user.username,
      acc_no: user.acc_no,
      email: user.email,
      phone_no: user.phone_no,
      gender: user.gender,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// Fund Wallet Schema (Updated)
const FundSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  account_id: { type: String, required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true, default: 0 },
  payment_method: { type: String, required: true, enum: ["Credit Card", "Direct Pay"] },
  date_time: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ["Completed", "Cancelled"], default: "Completed" }
});

const Fund = mongoose.model("Fund", FundSchema);

app.post("/fund-wallet", async (req, res) => {
  try {

    const { user_id, account_id, amount, payment_method } = req.body;
    console.log("Fund Wallet Request Received:", req.body);

    // Validate input
    if (!user_id || !account_id || !amount || isNaN(amount) || amount <= 0 || !payment_method) {
      console.error("Invalid Input:", req.body);
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

     // 🔹 Check if the account exists
     const account = await AccountModel.findById(account_id);
     if (!account) {
       console.error("Account Not Found! account_id:", account_id);
       return res.status(400).json({ success: false, message: "Account not found!" });
     }
 

    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      console.error("User Not Found:", user_id);
      return res.status(400).json({ success: false, message: "Invalid User" });
    }

    // Update account balance
    account.balance += Number(amount);
    await account.save();

    // Create a new fund record (each fund should be stored separately)
    const newFund = new Fund({
      user_id,
      account_id,  // Ensure account_id is stored
      amount: Number(amount),
      balance: Number(amount), // This should represent the funded amount only
      payment_method,
      status: "Completed",
    });

    await newFund.save();

    res.json({ success: true, message: "Funds added successfully", fund: newFund, newBalance: account.balance });// Send the updated balance to the frontend
  } catch (error) {
    console.error("Fund Wallet Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



const AccountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, default: 0 }, // Add balance field
});

const AccountModel = mongoose.model("Account", AccountSchema);

// Add Account API
app.post("/add-accounts", async (req, res) => {
  try {
      let { accountName, amount } = req.body;
      if (!accountName || !amount) {
          return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Save account to database (example)
      const newAccount = new AccountModel({ accountName, amount, balance: amount });
      await newAccount.save();

      console.log("New Account Added:", newAccount); // Log account ID

      res.status(201).json({
        success: true,
        message: "Account added successfully",
        newAccount: {
          _id: newAccount._id, // 🔹 Ensure the ID is included
          accountName: newAccount.accountName,
          amount: newAccount.amount,
          balance: newAccount.balance,
        }
      });
  } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

const WithdrawSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }, // Add balance field
});


const WithdrawModel = mongoose.model('Withdraw', WithdrawSchema);

// Withdraw endpoint
app.post('/withdraw', async (req, res) => {
  const { accountName, amount } = req.body;

  if (!accountName ||!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid withdrawal request.' });
  }

  try {
    // Find the account
    const account = await AccountModel.findOne({ accountName });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    account.balance -= amount;
    await account.save();

    // Record the withdrawal transaction
    const withdrawal = new WithdrawModel({ accountName, amount, balance: account.balance });
    await withdrawal.save();

    res.json({ 
      message: 'Withdrawal successful', 
      newBalance: account.balance,
      withdrawalId: withdrawal._id, // Return withdrawal transaction ID
     });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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