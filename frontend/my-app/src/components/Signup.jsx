// Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
        <li>Be at least 8 characters long</li>
        <li>Contain at least one digit</li>
        <li>Contain at least one special character</li>
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
          />
        </label>
        <label className="signup-label">
          Password:
          <input
            className="signup-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {/* Display password requirements message */}
          {formData.password && !passwordRegex.test(formData.password) && passwordRequirementsMessage}
        </label>
        <label className="signup-label">
          Confirm Password:
          <input
            className="signup-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
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
