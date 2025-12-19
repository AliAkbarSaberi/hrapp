import React from 'react';

function PersonCardEmploymentView({ salary, department, location, startDate, yearsOfService, exactYearsOfService }) {
  return (
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
  );
}

export default PersonCardEmploymentView;
