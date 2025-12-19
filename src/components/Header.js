import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1 className="header-title">hrApp</h1>
          <p className="header-subtitle">Human Resources Management System</p>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Employee List</Link>
          <Link to="/add-employee" className="nav-link">Add Employee</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
