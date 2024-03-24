const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'auctioneaseplatform@gmail.com', // Your Gmail email address
      pass: 'wqib pose sunz yjoz', // Use the generated app password here //this password is fake generated dont use for real purposes it wont work
    },
  });
// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists in the database' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username:req.body.username,
      email:req.body.email,
      password: hashedPassword
    });

    // Save the new user
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'User successfully registered!' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email does not exist' });
  }

  // Compare the passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }
  const token = jwt.sign({email:user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  sendWelcomeEmail(user.email);
  res.status(200).json({ message: 'Login successful!' ,token:token});
});

const sendForgotPasswordEmail = async (email, newPassword) => {
    
  
    try{ 
    // Check if the email exists in the database
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
  
    // Generate a new password (you may want to use a library like `crypto` for more security)
    const newPassword = crypto.randomBytes(8).toString('hex'); // Implement this function
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Update the user's password in the database
    user.password = newPassword;
    await user.save();
    sendForgotPasswordEmail(email, newPassword);
    // Send an email with the new password
    const mailOptions = {
      from: 'auctioneaseplatform.com', // Sender email address
      to: email,
      subject: 'Password Reset',
      text: `Dear user, we have received a forgot password request for your account. Your new password is: ${newPassword} Please do not share your password with anyone. We thank you for using our Online Auction System AuctionEase.`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Email sent successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  };

  const sendWelcomeEmail = (email) => {
    const mailOptions = {
      from: 'auctioneaseplatform@gmail.com',
      to: email,
      subject: 'Welcome to AuctionEase - Online Auction System',
      text: `Dear user, Welcome to AuctionEase, the ultimate online auction system. Explore exciting features and start bidding on your favorite items. Thank you for choosing AuctionEase!`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending welcome email:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      console.log('Welcome email sent:', info.response);
      return res.status(200).json({ message: 'Welcome email sent successfully' });
    });
  };
  

// Start the server
const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
