"use client";

import { Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import TrialBanner from '@/components/layout/TrialBanner'; 
import { useApp } from '@/context/AppContext';

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { startTrialSession, trialStatus } = useApp();
  
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!trialStatus && !hasFetched.current) {
      hasFetched.current = true;
      startTrialSession();
    }
  }, []); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const toggleMenu = () => setMobileOpen((prev) => !prev);
    window.addEventListener('toggleMobileMenu', toggleMenu);
    return () => window.removeEventListener('toggleMobileMenu', toggleMenu);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* <TrialBanner /> */}

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        
        <DashboardSidebar 
          mobileOpen={mobileOpen} 
          handleDrawerToggle={handleDrawerToggle} 
        />
        
        <Box 
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 4 }, 
            width: { sm: `calc(100% - 240px)` }, 
            overflow: 'hidden' 
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
}