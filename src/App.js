import React, { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div
      className="app-container">
        <div
        className="background-section"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image-background.svg)`,
      }}
        ></div>
        <div className="form-section">
      {currentForm === 'login' ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
    </div>
  );
}

export default App;



