import React, { useState } from 'react';
import Parse from 'parse';

export const Register = ({ onFormSwitch, styles }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass || !name) {
      setError('All fields are required.');
      return;
    }

    setError('');

    try {
      const user = new Parse.User();
      user.set('username', name);
      user.set('password', pass);
      user.set('email', email);

      await user.signUp();
      console.log(`Registration successful for email: ${email}`);
      
      onFormSwitch('login');
    } catch (error) {
      console.error('Error while registering user: ', error);
      setError(error.message);
    }
  };

  return (
    <div style={styles.authFormContainer}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={styles.label}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          style={styles.input} // 使用样式
        />
        
        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          placeholder="Email or phone number"
          id="email"
          name="email"
          style={styles.input} // 使用样式
        />
        
        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
          style={styles.input} // 使用样式
        />
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={styles.button}>Register</button>
      </form>
      
      <button className="link-btn" onClick={() => onFormSwitch('login')} style={styles.linkBtn}>
        Already have an account? 
        <br />Login here.
      </button>
    </div>
  );
};