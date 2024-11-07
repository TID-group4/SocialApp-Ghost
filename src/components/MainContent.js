// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import Parse from '../parseConfig';
import initialProfileImage from '../material/john.png'; // Import the initial profile image

function MainContent() {
  // State to control edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for form fields initialized as empty
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    language: '',
    nickName: '',
    email: '',
    country: '',
    avatar: initialProfileImage, // Default avatar
  });

  // State to store the file object for the avatar
  const [avatarFile, setAvatarFile] = useState(null);

  // Function to fetch user data from the database
  const fetchUserData = async () => {
    const User = Parse.Object.extend('_User');
    const query = new Parse.Query(User);

    try {
      const user = await query.first(); // Fetch the first user record from the database
      if (user) {
        setFormData({
          fullName: user.get('fullName') || '',
          gender: user.get('gender') || '',
          language: user.get('language') || '',
          nickName: user.get('username') || '', // Ensure 'username' matches the database
          email: user.get('email') || '',
          country: user.get('country') || '',
          avatar: user.get('avatar')?.url() || initialProfileImage,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data. Please try again later.');
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Toggle edit mode and save changes to the database
  const toggleEditMode = async () => {
    if (isEditing) {
      // Save changes to the database when exiting edit mode
      const User = Parse.Object.extend('_User');
      const query = new Parse.Query(User);

      try {
        const user = await query.first(); // Get the first user record from the database
        if (user) {
          user.set('fullName', formData.fullName);
          user.set('gender', formData.gender);
          user.set('language', formData.language);
          user.set('username', formData.nickName); // Ensure 'username' matches the database
          user.set('email', formData.email);
          user.set('country', formData.country);

          // Save the avatar as a Parse.File if a new file has been uploaded
          if (avatarFile) {
            const parseFile = new Parse.File(avatarFile.name, avatarFile);
            user.set('avatar', parseFile);
          }

          await user.save();
          alert('User data saved successfully!');
          fetchUserData(); // Refresh the data after saving
        }
      } catch (error) {
        console.error('Error saving user data:', error);
        alert(`Failed to save user data. Error: ${error.message}`);
      }
    }
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

  // Handle file input change for uploading a new image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // Set the file for saving later
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result, // Preview the uploaded image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.profileContainer}>
        {/* Display the profile image */}
        <img src={formData.avatar} alt="Profile" style={styles.profileImage} />

        <div style={styles.userInfo}>
          <h2 style={styles.userName}>{formData.fullName}</h2>
          <p style={styles.userEmail}>{formData.email}</p>
        </div>

        {/* Edit button toggles edit mode */}
        <button
          style={{
            ...styles.editButton,
            backgroundColor: isEditing ? '#FF910A' : '#007bff',
          }}
          onClick={toggleEditMode}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Show file input when in edit mode */}
      {isEditing && (
        <div style={styles.inputGroup}>
          <label style={styles.label}>Upload New Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
        </div>
      )}

      <div style={styles.form}>
        {/* Form fields */}
        {['fullName', 'gender', 'language', 'nickName', 'email', 'country'].map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>{field.replace(/^\w/, c => c.toUpperCase()).replace('Name', ' Name')}</label>
            <input
              style={styles.input}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        ))}
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
  fileInput: {
    marginTop: '10px',
  },
};

export default MainContent;
