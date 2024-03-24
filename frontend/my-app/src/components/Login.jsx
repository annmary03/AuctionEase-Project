import React, { useState } from 'react';
import './Login.css';
import Logb from '../assets/logb.jpg';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    if (user.email === 'auctioneaseplatform@gmail.com' && user.password === 'admin@123') {
      // If the login is for admin
      navigate('/Admin');
    } else {
      axios
        .post('http://localhost:9002/login', user)
        .then((res) => {
          const { message, token, blocked } = res.data;
          if (blocked) {
            alert("Can't login. User is blocked.");
          } else {
            alert(message);
          // Store token in local storage
          localStorage.setItem('token', token);
          // Decode the token to get user information
          const decodedToken = jwt_decode(token);
          setLoginUser(decodedToken);
          navigate('/Home');
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            console.log('Error occurred during login', error);
          }
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={Logb} alt="Logo" className="login-logo" />
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <h4>Welcome Back! Please enter your details.</h4>
        <form>
          <div className="form-group">
            <TextField
              label="Email"
              variant="standard"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="standard"
              name="password"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#" className="black-link">
              Forgot Password?
            </a>
          </div>
          <br />
          <button type="button" className="login-button" onClick={handleLogin}>
            Log in
          </button>
        </form>
        <div className="signup-link">
          <span>Don't have an account?</span>
          <Link to="/SignUp" className="black-link">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
