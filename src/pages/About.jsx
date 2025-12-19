import React from 'react';
import '../styles/Pages.css';

function About() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>About hrApp</h1>
        <div className="about-section">
          <h2>What is hrApp?</h2>
          <p>
            hrApp is a comprehensive Human Resources Management application designed to streamline 
            employee information management, tracking, and organizational oversight. Built with modern 
            React technologies, hrApp provides an intuitive interface for managing your organization's 
            most valuable asset: your people.
          </p>
        </div>

        <div className="about-section">
          <h2>Features</h2>
          <ul>
            <li><strong>Employee Directory</strong> - View and manage all employee information in one place</li>
            <li><strong>Service Tracking</strong> - Automatically calculate years of service for each employee</li>
            <li><strong>Anniversary Reminders</strong> - Get notified for important work anniversaries (5, 10, 15+ years)</li>
            <li><strong>Onboarding Alerts</strong> - Track new employees during their probation period</li>
            <li><strong>Employee Profiles</strong> - Detailed information including skills, department, location, and contact details</li>
            <li><strong>Add New Employees</strong> - Easily add new team members to the system</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose hrApp?</h2>
          <p>
            hrApp simplifies HR management by providing a centralized platform to track and manage 
            employee data. With automatic calculations for years of service and intelligent reminders 
            for important milestones, you can focus on what matters most: supporting your team.
          </p>
        </div>

        <div className="about-section">
          <h2>Technology</h2>
          <p>
            Built with React and React Router for a modern, fast, and responsive user experience. 
            hrApp is designed to scale with your organization's needs.
          </p>
        </div>

        <div className="about-section">
          <h2>Get Started</h2>
          <p>
            Navigate to <strong>Employee List</strong> to view all team members, or use <strong>Add Employee</strong> 
            to bring new members into the system.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
