import React, { useState } from "react";
import { Login } from "./AuthComponent/Login";
import { Register } from "./AuthComponent/Register";

export default function AuthPage({ onLogin }) {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.backgroundSection}></div>
      <div style={styles.formSection}>
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} onLogin={onLogin} styles={styles} />
        ) : (
          <Register onFormSwitch={toggleForm} styles={styles} />
        )}
      </div>
    </div>
  );
}


const styles = {
  authContainer: {
    display: "flex",
    height: "100vh",
  },
  backgroundSection: {
    flex: 2,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL}/background.svg)`,
  },
  formSection: {
    flex: 1,
    position: "relative",
    zIndex: 1,
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
  },
  authFormContainer: {
    flexShrink: 0,
    width: "300px",
    maxWidth: "none",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  title: {
    textAlign: "center",
    color: "#333",
    padding: "2rem",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    fontSize: "24px",
  },
  label: {
    textAlign: "left",
    padding: "0.5rem 0 0.25rem",
    color: "#555",
  },
  input: {
    margin: "0.5rem 0",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  button: {
    width: "100%",
    margin: "0.5rem 0",
    padding: "1rem 1em",
    backgroundColor: "#4d96ee",
    borderRadius: "20px",
    cursor: "pointer",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#357ab8",
  },
  linkBtn: {
    background: "none",
    color: "#555",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "normal",
  },
};
