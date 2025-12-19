import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddEmployee.css';

const API_URL = 'http://localhost:3001/employees';

function AddEmployee({ employees, setEmployees, fetchEmployees }) {
  const navigate = useNavigate();
  
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
      const response = await axios.post(API_URL, newEmployee);
      
      // Add new employee to the local list with the ID from server
      setEmployees([...employees, response.data]);
      
      // Re-fetch to ensure consistency
      if (fetchEmployees) {
        await fetchEmployees();
      }
      
      // Navigate back to employee list
      navigate('/');
    } catch (err) {
      console.error('Error adding employee:', err);
      setErrors({ submit: 'Failed to add employee. Make sure json-server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };
    // Navigate back to employee list
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="add-employee-section">
        <h1>Add New Employee</h1>
        <form className="employee-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Developer"
                className={errors.title ? 'input-error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary (€) *</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 4500"
                className={errors.salary ? 'input-error' : ''}
              />
              {errors.salary && <span className="error-message">{errors.salary}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., john@example.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., 040-1234567"
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="animal">Favorite Animal *</label>
              <input
                type="text"
                id="animal"
                name="animal"
                value={formData.animal}
                onChange={handleChange}
                placeholder="e.g., Dog, Cat, Owl"
                className={errors.animal ? 'input-error' : ''}
              />
              {errors.animal && <span className="error-message">{errors.animal}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Helsinki"
                className={errors.location ? 'input-error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Engineering"
                className={errors.department ? 'input-error' : ''}
              />
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated) *</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., React, JavaScript, Python"
              rows="4"
              className={errors.skills ? 'input-error' : ''}
            />
            {errors.skills && <span className="error-message">{errors.skills}</span>}
          </div>

          {errors.submit && (
            <div className="error-alert">
              <p>{errors.submit}</p>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Employee'}
            </button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
