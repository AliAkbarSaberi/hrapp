import React from 'react';
import PersonList from '../components/PersonList';
import '../styles/Pages.css';

function EmployeeListPage({ employees, setEmployees }) {
  return (
    <div className="page-container">
      <div className="employees-section">
        <h1>Employee List</h1>
        <p className="section-subtitle">Total: {employees.length} employees</p>
        <PersonList employees={employees} />
      </div>
    </div>
  );
}

export default EmployeeListPage;
