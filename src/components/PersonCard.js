import React from 'react';
import './PersonCard.css';

// Map animal names to emojis
const animalEmojis = {
  'Owl': '🦉',
  'Dog': '🐕',
  'Cat': '🐱',
  'Eagle': '🦅',
  'Butterfly': '🦋',
  'Fox': '🦊',
  'Rabbit': '🐰',
  'Wolf': '🐺',
  'Penguin': '🐧',
  'Dolphin': '🐬',
  'Lion': '🦁'
};

// Convert animal name to emoji
const getAnimalEmoji = (animalName) => {
  return animalEmojis[animalName] || '🐾';
};

// Calculate years of service
const calculateYearsOfService = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }
  
  return years;
};

// Calculate exact time in service (in years as decimal)
const calculateExactYearsOfService = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const diffYears = diffDays / 365.25;
  return diffYears;
};

// Determine if anniversary reminder needed
const getAnniversaryReminder = (startDate) => {
  const exactYears = calculateExactYearsOfService(startDate);
  const yearsOfService = calculateYearsOfService(startDate);
  
  // Check if exactly 5, 10, 15, 20, 25, etc. years
  if (Math.abs(exactYears - Math.round(exactYears)) < 0.02 && yearsOfService > 0 && yearsOfService % 5 === 0) {
    return {
      emoji: '🎉',
      message: 'Schedule recognition meeting.'
    };
  }
  
  // Check if less than 6 months
  if (exactYears < 0.5) {
    return {
      emoji: '🔔',
      message: 'Schedule probation review.'
    };
  }
  
  return null;
};

function PersonCard({ id, name, title, salary, phone, email, animal, startDate, location, department, skills }) {
  const yearsOfService = calculateYearsOfService(startDate);
  const exactYearsOfService = calculateExactYearsOfService(startDate);
  const reminder = getAnniversaryReminder(startDate);
  const animalEmoji = getAnimalEmoji(animal);
  
  return (
    <div className="person-card">
      <div className="person-header">
        <div className="person-header-left">
          <h2 className="person-name">{name}</h2>
          <p className="person-title">{title}</p>
        </div>
        <span className="person-animal">{animalEmoji}</span>
      </div>
      
      <div className="person-details">
        {/* Contact Information */}
        <div className="detail-section">
          <h3 className="section-title">Contact</h3>
          <div className="person-field">
            <span className="person-label">Email:</span>
            <span className="person-value">
              <a href={`mailto:${email}`}>{email}</a>
            </span>
          </div>
          <div className="person-field">
            <span className="person-label">Phone:</span>
            <span className="person-value">
              <a href={`tel:${phone}`}>{phone}</a>
            </span>
          </div>
        </div>
        
        {/* Employment Information */}
        <div className="detail-section">
          <h3 className="section-title">Employment</h3>
          <div className="person-field">
            <span className="person-label">Salary:</span>
            <span className="person-value">€{salary.toLocaleString()}</span>
          </div>
          <div className="person-field">
            <span className="person-label">Department:</span>
            <span className="person-value">{department}</span>
          </div>
          <div className="person-field">
            <span className="person-label">Location:</span>
            <span className="person-value">{location}</span>
          </div>
          <div className="person-field">
            <span className="person-label">Started:</span>
            <span className="person-value">{new Date(startDate).toLocaleDateString('en-US')}</span>
          </div>
          <div className="person-field">
            <span className="person-label">Years in Service:</span>
            <span className="person-value">{yearsOfService} years {Math.round((exactYearsOfService % 1) * 12)} months</span>
          </div>
        </div>
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        )}
        
        {/* Anniversary Reminder */}
        {reminder && (
          <div className="reminder-section">
            <p className="reminder-message">
              <span className="reminder-emoji">{reminder.emoji}</span>
              {reminder.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonCard;
