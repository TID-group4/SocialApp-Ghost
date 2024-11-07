// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
    <Header />
    <MainContent />
    <Footer />
  </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
