import React, { useState, useEffect } from "react";
import avatar from "../Assets/avatar.png"; 
import Parse from "parse";


function MainContent({username,email, onUpdateUsername}) {
  // State to control edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: username,
    gender: "",
    language: "",
    email: email,
    country: "",
    avatar: "https://via.placeholder.com/50" ,
  });


  // Toggle edit mode and save changes
  const toggleEditMode = async (e) => {
    if (isEditing) {
      await handleSubmit(e); // Call submit function when switching from edit to save
    }
    setIsEditing(!isEditing); // Toggle editing state
  };

  useEffect(() => {
    // Fetch current user's details
    const fetchUserData = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setFormData({
          fullName: currentUser.get("username"),
          email: currentUser.get("email"),
          gender: currentUser.get("gender") || "",
          language: currentUser.get("language") || "",
          avatar: currentUser.get("avatar") || "https://via.placeholder.com/50",
          country: currentUser.get("country") || "",
        });
      }
    };

    fetchUserData();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = Parse.User.current();

    if (currentUser) {
      currentUser.set("gender", formData.gender);
      currentUser.set("language", formData.language);
      currentUser.set("country", formData.country);
      currentUser.set("username", formData.fullName); 

      try {
        await currentUser.save();
        alert("Profile updated successfully!");
        onUpdateUsername(formData.fullName); // Update username in parent component
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}> 
    <main style={styles.main}>
      <div style={styles.profileContainer} >
        {/* Display the imported profile image */}
        <img src={avatar} alt="Profile" style={styles.profileImage} />

        <div style={styles.userInfo} >
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
          <label style={styles.label}>Name</label>
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
          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly="true"
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
    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", // 父容器占据视口的全部高度
  },
  main: {
    // main 元素的其他样式，如大小和颜色
    width: "80%", // 示例宽度
    maxWidth: "800px", // 示例最大宽度
    backgroundColor: "#D1E8E4", // 示例背景色
    padding: "20px",
    borderRadius: "8px",
  },
 
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userInfo: {
    flexGrow: 1,
  },
  userName: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  userEmail: {
    fontSize: "14px",
    color: "#555555",
    margin: 0,
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "normal",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
};

export default MainContent;
