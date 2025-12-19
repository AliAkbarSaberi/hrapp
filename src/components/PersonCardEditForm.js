import React from 'react';

function PersonCardEditForm({ editData, onEditChange, onSave, onCancel, isSaving }) {
  return (
    <>
      <div className="edit-field">
        <label className="person-label">Salary:</label>
        <input
          type="number"
          name="salary"
          value={editData.salary}
          onChange={onEditChange}
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
          onChange={onEditChange}
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
          onChange={onEditChange}
          className="edit-input"
          placeholder="Location"
        />
      </div>
      <div className="detail-section">
        <h3 className="section-title">Skills</h3>
        <div className="edit-field">
          <textarea
            name="skills"
            value={editData.skills}
            onChange={onEditChange}
            className="edit-input edit-textarea"
            placeholder="Skills (comma-separated: e.g., React, Node.js, Design)"
            rows="3"
          />
        </div>
      </div>
      <div className="button-group">
        <button
          className="btn btn-save"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          className="btn btn-cancel"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default PersonCardEditForm;
