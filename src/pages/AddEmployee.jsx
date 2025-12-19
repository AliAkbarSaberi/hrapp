import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/employees';

function AddEmployee({ employees, setEmployees, fetchEmployees }) {
  const navigate = useNavigate();
  const { post } = useAxios();
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    salary: '',
    phone: '',
    email: '',
    animal: '',
    startDate: new Date().toISOString().split('T')[0],
    location: '',
    department: '',
    skills: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Valid salary is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.animal.trim()) newErrors.animal = 'Animal is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new employee object
    const newEmployee = {
      name: formData.name,
      title: formData.title,
      salary: parseInt(formData.salary),
      phone: formData.phone,
      email: formData.email,
      animal: formData.animal,
      startDate: formData.startDate,
      location: formData.location,
      department: formData.department,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    };

    try {
      setIsSubmitting(true);
      // Post new employee to the server
      const response = await post(API_URL, newEmployee);
      
      // Add new employee to the local list with the ID from server
      setEmployees([...employees, response.data]);
      
      // Re-fetch to ensure consistency
      if (fetchEmployees) {
        await fetchEmployees();
      }
      
      // Navigate back to employee list
      navigate('/employees');
    } catch (err) {
      console.error('Error adding employee:', err);
      setErrors({ submit: 'Failed to add employee. Make sure the backend server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="page-container" display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Employee
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Full Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              margin="normal"
              label="Job Title *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Salary (€) *"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              margin="normal"
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              margin="normal"
              label="Favorite Animal *"
              name="animal"
              value={formData.animal}
              onChange={handleChange}
              error={!!errors.animal}
              helperText={errors.animal}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Start Date *"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              margin="normal"
              label="Location *"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Department *"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
            />
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Skills (comma-separated) *"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            error={!!errors.skills}
            helperText={errors.skills}
            multiline
            rows={3}
          />
          {errors.submit && (
            <Typography color="error" sx={{ mt: 1 }}>{errors.submit}</Typography>
          )}
          <Box display="flex" gap={2} mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Adding...' : 'Add Employee'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/employees')}
              disabled={isSubmitting}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddEmployee;
