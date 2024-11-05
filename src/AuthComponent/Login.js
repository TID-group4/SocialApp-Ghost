import React, { useState } from 'react';
import Parse from 'parse';
import { useNavigate } from 'react-router-dom'; 

export const Login = ({ onFormSwitch, onLogin, styles }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    
    try {
      const user = await Parse.User.logIn(email, password);
      alert("Login successful!");
      const username = user.get("username");
      const useremail = user.get("email");

      onLogin(username,useremail); 
      navigate('/home');
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };

  return (
    <div style={styles.authFormContainer}>
      <h2 style={styles.title}>Nice to see you again</h2>
      <form className="login_form" onSubmit={handleSubmit}>
        <label htmlFor="login" style={styles.label}>Login</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          id="login"
          name="login"
          style={styles.input}
        />
        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <button className="link-btn" onClick={() => onFormSwitch('register')} style={styles.linkBtn}>
        Don't have an account? <br />
        Register here.
      </button>
    </div>
  );
};