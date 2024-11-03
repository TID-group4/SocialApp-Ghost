// src/components/Header.js
import React from 'react';
import backIcon from '../material/arrow.png';       // Import back icon
import logoutIcon from '../material/logout.png';   // Import logout icon

function Header() {
  return (
    <header style={styles.header}>
      {/* Back button with icon */}
      <div style={styles.backButtonContainer}>
        <img src={backIcon} alt="Back Icon" style={styles.icon} /> {/* Icon for back button */}
        <button style={styles.backButton}>Back</button> {/* Back button text */}
      </div>

      {/* Log out button with icon above */}
      <div style={styles.rightSection}>
        <img src={logoutIcon} alt="Logout Icon" style={styles.logoutIcon} /> {/* Icon above logout */}
        <button style={styles.logoutButton}>Log out</button> {/* Logout button text */}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#306C71',
    color: '#fff',
    height: '70px',
  },
  backButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // Space between the icon and the back text
  },
  icon: {
    width: '16px', // Size of the back icon
    height: '16px',
    marginLeft: '150px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
     // Left margin for spacing from the edge of the footer
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px', // Space between the icon and the text
  },
  logoutIcon: {
    width: '40px', // Size of the logout icon
    height: '40px',
    marginRight: '150px'
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white', // Matching color for "Log out" text
    cursor: 'pointer',
    fontSize: '16px', // Smaller font size for "Log out"
    marginRight: '150px'
  },
};

export default Header;
