import React, { useState } from 'react';
import './LeftBar.css';
import avatar from '../Assets/avatar.png';
import switchGroup from "../Assets/switch-group.png";
import { useNavigate } from 'react-router-dom';

function LeftBar({ onGroupChange, username }) {
  const groups = ["Relationships", "Look Around", "Depression"];
  const [currentGroup, setCurrentGroup] = useState(groups[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleGroupSelect = (group) => {
    setCurrentGroup(group);
    setShowDropdown(false);
    onGroupChange(group); // 通知 Home 组件更新分组
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleAvatarClick = () => {
    navigate('/profile'); 
  };

  return (
    <aside className="sidebar">
      <img src={avatar} alt="User profile" className="profile-image" loading="lazy" 
       onClick={handleAvatarClick} 
       style={{ cursor: 'pointer' }}
       />
      <h2 className="username">{username}</h2>
      <h1 className="group-title">{currentGroup}</h1>
      <button className="group-switcher" onClick={toggleDropdown} tabIndex="0">
        <img src={switchGroup} alt="Change group icon" className="group-icon" loading="lazy" />
        <span className="group-text">Change Group</span>
      </button>

      {showDropdown && (
        <div className="dropdown">
          {groups.map((group, index) => (
            <div 
              key={index} 
              className="dropdown-item" 
              onClick={() => handleGroupSelect(group)}
            >
              {group}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default LeftBar;