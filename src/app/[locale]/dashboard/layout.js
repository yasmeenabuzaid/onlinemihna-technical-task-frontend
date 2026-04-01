"use client";

import { Box, useTheme, useMediaQuery } from '@mui/material';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 ,    padding: 5, }}>
        <DashboardSidebar />
          {children}
      </Box>
    </Box>
  );
}