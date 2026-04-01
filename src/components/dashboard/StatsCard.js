"use client";

import { Box, Card, CardContent, Typography } from '@mui/material';

export default function StatsCard({ title, value, icon, bgColor = '#e0f2fe' }) {
    
  return (
    <Card 
      sx={{ 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
        borderRadius: 3,
        height: '100%',
        border: '1px solid #f1f5f9',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
        }
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 3 }}>
        {/* icon  */}
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: bgColor, 
            borderRadius: '16px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>

        {/* title and value */}
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}