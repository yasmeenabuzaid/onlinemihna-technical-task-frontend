"use client";

import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import TrialBanner from '@/components/layout/TrialBanner'; 
import { useApp } from '@/context/AppContext';

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { startTrialSession } = useApp();

  useEffect(() => {
    startTrialSession();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <TrialBanner />

      <Box sx={{ display: 'flex', flexGrow: 1, padding: { xs: 2, md: 5 } }}>
        <DashboardSidebar />
        
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}