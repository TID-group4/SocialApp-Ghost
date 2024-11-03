import React, { useState } from 'react';

export const Login = ({ onFormSwitch }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !pass) {
      alert('Please fill in both fields.');
      return;
    }
    console.log(`Login attempted with email: ${email}`);
  };

  return (
    <div className="auth-form-container">
      <h2>Nice to see you again</h2>
      <form className="login_form" onSubmit={handleSubmit}>
        <label htmlFor="login">Login</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type=""
          placeholder="Email or phone number"
          id="login"
          name="login"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
        />
        <button type="submit">Sign In</button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch('register')}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};





