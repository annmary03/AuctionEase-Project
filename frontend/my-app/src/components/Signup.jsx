// Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(formData.password)) {
     alert("The components of a strong password include:\n- At least 12 characters\n- A combination of upper and lower-case letters, numbers, and special characters\n- Does not use personal information\n- A unique password for every account.");
    return;
}

    console.log(formData);
     // Navigate to login page after successful signup
     navigate('/login');
  };

  // Dynamic password requirements message
  const passwordRequirementsMessage = (
    <div className="password-requirements">
      <p>Password must:</p>
      <ul>
        <li className={formData.password.length >= 12 ? 'satisfied' : ''}>Be at least 12 characters long</li>
        <li className={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'satisfied' : ''}>Contain a combination of upper and lower-case letters</li>
        <li className={/\d/.test(formData.password) ? 'satisfied' : ''}>Contain at least one digit</li>
        <li className={/[\W_]/.test(formData.password) ? 'satisfied' : ''}>Contain at least one special character</li>
      </ul>
    </div>
  );
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  return (
    <div className="signup-container">
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
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Display password requirements message */}
          {formData.password && !passwordRegex.test(formData.password) && passwordRequirementsMessage}
        </label>
        <label className="signup-label">
          Confirm Password:
          <div className="password-input-container">
            <input
              className="signup-input password-input"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        <button className="signup-button" type="submit">Sign up</button>
      </form>
      <div className="signup-login-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
