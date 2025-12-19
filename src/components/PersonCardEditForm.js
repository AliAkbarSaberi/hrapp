import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function PersonCardEditForm({ editData, onEditChange, onSave, onCancel, isSaving }) {
  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Salary"
        name="salary"
        type="number"
        value={editData.salary}
        onChange={onEditChange}
        placeholder="Salary"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Department"
        name="department"
        value={editData.department}
        onChange={onEditChange}
        placeholder="Department"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Location"
        name="location"
        value={editData.location}
        onChange={onEditChange}
        placeholder="Location"
      />
      <Box mt={2}>
        <Typography variant="subtitle2" fontWeight={600}>Skills</Typography>
        <TextField
          fullWidth
          margin="normal"
          name="skills"
          value={editData.skills}
          onChange={onEditChange}
          placeholder="Skills (comma-separated: e.g., React, Node.js, Design)"
          multiline
          rows={3}
        />
      </Box>
      <Box display="flex" gap={2} mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default PersonCardEditForm;
