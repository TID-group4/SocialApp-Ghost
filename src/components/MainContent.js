// src/components/MainContent.js
import React, { useState } from 'react';
import profileImage from '../material/john.png'; // Import the profile image

function MainContent() {
  // State to control edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    gender: "Male",
    language: "English",
    nickName: "@john_d",
    email: "JohnD@itu.dk",
    country: "Denmark",
  });

  // Toggle edit mode and save changes
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main style={styles.main}>
      <div style={styles.profileContainer}>
        {/* Display the imported profile image */}
        <img src={profileImage} alt="Profile" style={styles.profileImage} />
        
        <div style={styles.userInfo}>
          <h2 style={styles.userName}>{formData.fullName}</h2>
          <p style={styles.userEmail}>{formData.email}</p>
        </div>

        {/* Edit button toggles edit mode */}
        <button style={styles.editButton} onClick={toggleEditMode}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Gender</label>
          <input
            style={styles.input}
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Language</label>
          <input
            style={styles.input}
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nick Name</label>
          <input
            style={styles.input}
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Country</label>
          <input
            style={styles.input}
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    padding: '30px',
    backgroundColor: '#D1E8E4',
    borderRadius: '8px',
    margin: '20px auto',
    maxWidth: '1000px',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userInfo: {
    flexGrow: 1,
  },
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  userEmail: {
    fontSize: '14px',
    color: '#555555',
    margin: 0,
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'normal',
    color: '#333',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
};

export default MainContent;
