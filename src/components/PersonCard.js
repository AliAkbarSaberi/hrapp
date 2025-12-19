import React, { useState } from 'react';
import './PersonCard.css';
import PersonCardEditForm from './PersonCardEditForm';
import PersonCardEmploymentView from './PersonCardEmploymentView';
import { calculateYearsOfService, calculateExactYearsOfService } from '../utils/dateHelpers';
import { getAnimalEmoji } from '../utils/animalHelpers';
import { getAnniversaryReminder } from '../utils/reminderHelpers';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
    <Card sx={{ maxWidth: 500, margin: '1rem auto', boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h6" component="div">{name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{title}</Typography>
          </Box>
          <Typography variant="h4" component="span">{animalEmoji}</Typography>
        </Box>

        {showConfirmation && (
          <Box mb={2}>
            <Typography color="success.main" variant="body2">
              ✓ Employee information updated successfully!
            </Typography>
          </Box>
        )}

        {/* Contact Information */}
        <Box mb={2}>
          <Typography variant="subtitle2" fontWeight={600}>Contact</Typography>
          <Typography variant="body2">
            <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> <a href={`tel:${phone}`}>{phone}</a>
          </Typography>
        </Box>

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
        {!isEditing && skills && skills.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2" fontWeight={600}>Skills</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {skills.map((skill, index) => (
                <Box key={index} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', px: 1.5, py: 0.5, borderRadius: 2, fontSize: 13 }}>
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Anniversary Reminder */}
        {reminder && !isEditing && (
          <Box mt={2}>
            <Typography variant="body2" color="warning.main">
              <span style={{ marginRight: 4 }}>{reminder.emoji}</span>
              {reminder.message}
            </Typography>
          </Box>
        )}
      </CardContent>
      {/* Action Buttons */}
      {!isEditing && (
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default PersonCard;
