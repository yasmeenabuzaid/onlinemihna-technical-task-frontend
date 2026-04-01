"use client";

import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#0f172a', 
        color: 'white', 
        py: 4, 
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'end' }}>
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
          HireWay
        </Typography>

        <Typography variant="caption" color="gray">
          © {new Date().getFullYear()} HireWay. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}