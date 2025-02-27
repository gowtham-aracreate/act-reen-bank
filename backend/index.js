const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const bcypt = require('bcryptjs'); //Password Hashing

app.use(cors());
app.use(express.json());

// Adding Database
const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/Reen-Bank');
    console.log('Database connected');
}
connectDB();

// Creating Schemas
const UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true},
    password: String
});

// Creating Models
const User = mongoose.model('UserDetails', UserSchema);

// Post => Use to submit the create and update in server
app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    const newUser = await User.create({
      username,
      email,
      password: bcypt.hashSync(password, 10)
    }
  );
    res.send(newUser)
  })
  
  app.get('/get_user', async (req, res) => {
    const data = await User.find();
    res.json(data)
  })
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })