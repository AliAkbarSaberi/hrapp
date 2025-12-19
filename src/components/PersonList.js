import React from 'react';
import PersonCard from './PersonCard';
import './PersonList.css';

function PersonList({ employees, onUpdate }) {
  return (
    <div className="person-list">
      <div className="employees-grid">
        {employees.map((employee) => (
          <PersonCard
            key={employee.id}
            id={employee.id}
            name={employee.name}
            title={employee.title}
            salary={employee.salary}
            phone={employee.phone}
            email={employee.email}
            animal={employee.animal}
            startDate={employee.startDate}
            location={employee.location}
            department={employee.department}
            skills={employee.skills}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default PersonList;
