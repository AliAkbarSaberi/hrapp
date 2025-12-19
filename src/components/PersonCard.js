import React, { useState } from 'react';
import './PersonCard.css';
import PersonCardEditForm from './PersonCardEditForm';
import PersonCardEmploymentView from './PersonCardEmploymentView';
import { calculateYearsOfService, calculateExactYearsOfService } from '../utils/dateHelpers';
import { getAnimalEmoji } from '../utils/animalHelpers';
import { getAnniversaryReminder } from '../utils/reminderHelpers';

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
        {!isEditing ? (
          <PersonCardEmploymentView
            salary={salary}
            department={department}
            location={location}
            startDate={startDate}
            yearsOfService={yearsOfService}
            exactYearsOfService={exactYearsOfService}
          />
        ) : (
          <PersonCardEditForm
            editData={editData}
            onEditChange={handleEditChange}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        )}
        
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
        ) : null}
        
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
        {!isEditing && (
          <div className="button-group">
            <button
              className="btn btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonCard;
