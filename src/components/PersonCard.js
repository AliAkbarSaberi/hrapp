import React, { useState } from 'react';
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

function PersonCard({ id, name, title, salary, phone, email, animal, startDate, location, department, skills, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editData, setEditData] = useState({
    salary: salary || '',
    location: location || '',
    department: department || '',
    skills: skills ? skills.join(', ') : ''
  });
  
  const yearsOfService = calculateYearsOfService(startDate);
  const exactYearsOfService = calculateExactYearsOfService(startDate);
  const reminder = getAnniversaryReminder(startDate);
  const animalEmoji = getAnimalEmoji(animal);
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Build updated object with only changed fields
      const updates = {};
      if (editData.salary !== salary) updates.salary = Number(editData.salary);
      if (editData.location !== location) updates.location = editData.location;
      if (editData.department !== department) updates.department = editData.department;
      if (editData.skills.replace(/\s/g, '') !== (skills ? skills.join(',') : '')) {
        updates.skills = editData.skills.split(',').map(s => s.trim()).filter(s => s);
      }
      
      // Send PATCH request
      await onUpdate(id, updates);
      
      // Show success message
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    setEditData({
      salary: salary || '',
      location: location || '',
      department: department || '',
      skills: skills ? skills.join(', ') : ''
    });
    setIsEditing(false);
  };
  
  return (
    <div className="person-card">
      <div className="person-header">
        <div className="person-header-left">
          <h2 className="person-name">{name}</h2>
          <p className="person-title">{title}</p>
        </div>
        <span className="person-animal">{animalEmoji}</span>
      </div>
      
      {showConfirmation && (
        <div className="confirmation-message">
          ✓ Employee information updated successfully!
        </div>
      )}
      
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
          {!isEditing ? (
            <>
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
            </>
          ) : (
            <>
              <div className="edit-field">
                <label className="person-label">Salary:</label>
                <input
                  type="number"
                  name="salary"
                  value={editData.salary}
                  onChange={handleEditChange}
                  className="edit-input"
                  placeholder="Salary"
                />
              </div>
              <div className="edit-field">
                <label className="person-label">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={editData.department}
                  onChange={handleEditChange}
                  className="edit-input"
                  placeholder="Department"
                />
              </div>
              <div className="edit-field">
                <label className="person-label">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={editData.location}
                  onChange={handleEditChange}
                  className="edit-input"
                  placeholder="Location"
                />
              </div>
            </>
          )}
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
        {!isEditing ? (
          skills && skills.length > 0 && (
            <div className="detail-section">
              <h3 className="section-title">Skills</h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="detail-section">
            <h3 className="section-title">Skills</h3>
            <div className="edit-field">
              <textarea
                name="skills"
                value={editData.skills}
                onChange={handleEditChange}
                className="edit-input edit-textarea"
                placeholder="Skills (comma-separated: e.g., React, Node.js, Design)"
                rows="3"
              />
            </div>
          </div>
        )}
        
        {/* Anniversary Reminder */}
        {reminder && !isEditing && (
          <div className="reminder-section">
            <p className="reminder-message">
              <span className="reminder-emoji">{reminder.emoji}</span>
              {reminder.message}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="button-group">
          {!isEditing ? (
            <button
              className="btn btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="btn btn-save"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                className="btn btn-cancel"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
