import React, { useState, useEffect, useRef } from 'react';
import ChevronDown from '../assets/Display.svg';

const Header = ({ setGroupBy, setSortBy, groupBy, sortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="display-button"
        >
          <img src={ChevronDown} alt="Display"/>
          Display
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <div className="dropdown-section">
                <p className="section-label">Grouping</p>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="dropdown-section">
                <p className="section-label">Ordering</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;