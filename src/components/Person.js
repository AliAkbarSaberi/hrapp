import React from 'react';
import './Person.css';

function Person({ name, title, salary, phone, email, animal }) {
  return (
    <div className="person-card">
      <div className="person-header">
        <h2 className="person-name">{name}</h2>
        {animal && <span className="person-animal">{animal}</span>}
      </div>
      
      <div className="person-details">
        {title && (
          <div className="person-field">
            <span className="person-label">Title:</span>
            <span className="person-value">{title}</span>
          </div>
        )}
        
        {salary && (
          <div className="person-field">
            <span className="person-label">Salary:</span>
            <span className="person-value">${salary.toLocaleString()}</span>
          </div>
        )}
        
        {phone && (
          <div className="person-field">
            <span className="person-label">Phone:</span>
            <span className="person-value">
              <a href={`tel:${phone}`}>{phone}</a>
            </span>
          </div>
        )}
        
        {email && (
          <div className="person-field">
            <span className="person-label">Email:</span>
            <span className="person-value">
              <a href={`mailto:${email}`}>{email}</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Person;
