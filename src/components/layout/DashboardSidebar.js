"use client"; // this is CSR component because it uses hooks and context

// mui + icons
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';

// navigation + context
import { useRouter } from '@/navigation';
import { useApp } from '@/context/AppContext';

const drawerWidth = 240; 
// we initialize the drawer width here because we will use it in both the sidebar and the layout 
// to keep it consistent and avoid hardcoding the value in multiple places

export default function DashboardSidebar() {
  const router = useRouter();
  const { isRTL } = useApp();

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Talents', icon: <PeopleIcon />, path: '/dashboard/talents' },
    { text: 'My Jobs', icon: <WorkIcon />, path: '/dashboard/jobs' },
  ];
  // we define the menu items for the sidebar as an array of objects to  make the sidebar easily extensible and maintainable,
  //  allowing us to add or remove items without changing the core logic of the component

  return (
    <Drawer
      variant="permanent"
      anchor={isRTL ? 'right' : 'left'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: isRTL ? 0 : '1px solid #e2e8f0', borderLeft: isRTL ? '1px solid #e2e8f0' : 0 },
      }}
    >
      <Toolbar /> 
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {/* items of menu */}
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}