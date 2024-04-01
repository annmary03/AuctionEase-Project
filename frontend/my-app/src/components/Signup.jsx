// Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [passwordRequirements, setPasswordRequirements] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: inputValue
    }));

    if (name === 'password') {
      updatePasswordRequirements(value);
    }
  };

  const updatePasswordRequirements = (password) => {
    const requirements = [
      { text: 'Password must contain' },
      { text: 'At least 12 characters long', satisfied: password.length >= 12 },
      { text: 'Contain a combination of upper and lower-case letters', satisfied: /[a-z]/.test(password) && /[A-Z]/.test(password) },
      { text: 'Contain at least one digit', satisfied: /\d/.test(password) },
      { text: 'Contain at least one special character', satisfied: /[@$!%*?&]/.test(password) }
    ];
    setPasswordRequirements(requirements);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const response = await fetch('http://localhost:9002/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error signing up. Please try again.');
      }

      const data = await response.json();
      console.log("Signup response:", data);
      navigate('/login');
      alert("Signup successful! You can now login with your credentials.");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="signup-container">
        <div className="left-panel">
          <h2>Create an Account</h2>
          <p>Sign up to access exclusive features!</p>
        </div>
        <div className="right-panel">
          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-label">
              Username:
              <input
                className="signup-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </label>
            <label className="signup-label">
              Email:
              <input
                className="signup-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </label>
            <label className="signup-label">
              Password:
              <div className="password-input-container">
                <input
                  className="signup-input password-input"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="show-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </div>
              {/* Display password requirements */}
              <div className="password-requirements">
                <ul>
                  {passwordRequirements.map((requirement, index) => (
                    <li key={index} className={requirement.satisfied ? 'satisfied' : ''}>{requirement.text}</li>
                  ))}
                </ul>
              </div>
            </label>
            <label className="signup-label">
              Confirm Password:
              <div className="password-input-container">
                <input
                  className="signup-input password-input"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <span className="show-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </div>
            </label>
            <div className="terms-checkbox">
              <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
              <label htmlFor="agreeToTerms">I agree to the Terms of Service and Privacy Policy.</label>
            </div>
            <button className="signup-button" type="submit">Create Account</button>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Auctionease, Inc.</p>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Signup;