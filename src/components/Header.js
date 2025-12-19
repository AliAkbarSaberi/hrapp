import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              hrApp
            </Typography>
            <Typography variant="subtitle2" component="div">
              Human Resources Management System
            </Typography>
          </Link>
        </Box>
        <Button color="inherit" component={Link} to="/employees">Employee List</Button>
        <Button color="inherit" component={Link} to="/add-employee">Add Employee</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
