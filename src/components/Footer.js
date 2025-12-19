import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box component="footer" sx={{ py: 2, px: 1, mt: 'auto', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {currentYear} hrApp. All rights reserved. | WP25K
      </Typography>
    </Box>
  );
}

export default Footer;
