import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to hrApp</h1>
          <p className="welcome-subtitle">Human Resources Management System</p>
          
          <p className="welcome-description">
            Manage your organization's most valuable asset - your people. 
            Track employees, monitor service milestones, and streamline HR operations.
          </p>

          <div className="welcome-features">
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <h3>Employee Directory</h3>
              <p>View and manage all employee information in one place</p>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <h3>Service Tracking</h3>
              <p>Automatically track years of service for each employee</p>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🎉</span>
              <h3>Milestones</h3>
              <p>Get notified for work anniversaries and probation reviews</p>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">➕</span>
              <h3>Add Employees</h3>
              <p>Quickly add new team members to the system</p>
            </div>
          </div>

          <div className="welcome-actions">
            <Link to="/employees" className="btn-primary">
              View Employee List
            </Link>
            <Link to="/add-employee" className="btn-secondary">
              Add New Employee
            </Link>
            <Link to="/about" className="btn-tertiary">
              Learn More
            </Link>
          </div>

          <div className="welcome-stats">
            <p>Get started by exploring the employee directory or adding new team members.</p>
          </div>
        </div>

        <div className="welcome-illustration">
          <div className="illustration-box">
            <p className="illustration-text">🏢</p>
            <h2>HR Management Made Easy</h2>
            <p>Streamline your HR workflows with our intuitive interface</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
