"use client"; 

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';

import { useRouter } from '@/navigation';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl';

const drawerWidth = 240; 

export default function DashboardSidebar({ mobileOpen, handleDrawerToggle }) {
  const router = useRouter();
  const { isRTL } = useApp();
  const t = useTranslations('Sidebar'); 

  const menuItems = [
    { text: t('overview'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('talents'), icon: <PeopleIcon />, path: '/dashboard/talents' },
    { text: t('myJobs'), icon: <WorkIcon />, path: '/dashboard/jobs' },
  ];

  const drawerContent = (
    <>
      <Toolbar /> 
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => {
                router.push(item.path);
                if (handleDrawerToggle) handleDrawerToggle(); 
              }}>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      
      <Drawer
        variant="temporary"
        anchor={isRTL ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} 
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        anchor={isRTL ? 'right' : 'left'}
        sx={{
          display: { xs: 'none', sm: 'block' }, 
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: isRTL ? 0 : '1px solid #e2e8f0', 
            borderLeft: isRTL ? '1px solid #e2e8f0' : 0 
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}