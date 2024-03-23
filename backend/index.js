const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();

// Connect to MongoDB (replace this URI with your actual MongoDB URI)
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://annmarywilson293:TbeQEJ2MVGPIc0DY@cluster0.iggvkd2.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// Example middleware to set no-cache headers
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  next();
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'auctioneaseplatform@gmail.com', // Your Gmail email address
    pass: 'wqib pose sunz yjoz',
  },
});

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists in the database' });
  }

  // If the email doesn't exist, proceed to create a new user
  const newUser = new User({
    username,
    email,
    password
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'User successfully registered!', user });
  });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user with provided email exists in the database
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Email does not exist' });
    }

    // Now, verify the password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  });
});

// Forgot password endpoint
app.post('/api/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a new password (you may want to use a library like `crypto` for more security)
    const newPassword = crypto.randomBytes(8).toString('hex');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Send an email with the new password
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Dear user, we have received a forgot password request for your account. Your new password is: ${newPassword}`,
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
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
