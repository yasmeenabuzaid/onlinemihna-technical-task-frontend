"use client";

import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Tooltip } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout'; 
import MenuIcon from '@mui/icons-material/Menu'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; 

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useApp } from '@/context/AppContext'; 

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); 
  const t = useTranslations('Navbar');
  
  const { trialStatus, isRTL } = useApp();
  const isDashboard = pathname.includes('/dashboard');

  const handleLanguageSwitch = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mihna_guest_id'); 
      window.location.href = `/${locale}`;
    }
  };

  const handleToggleSidebar = () => {
    window.dispatchEvent(new Event('toggleMobileMenu'));
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', py: 0.5, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isDashboard && (
              <IconButton color="inherit" onClick={handleToggleSidebar} sx={{ display: { xs: 'block', sm: 'none' }, color: 'text.primary', mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0 }}>
                <MenuIcon />
              </IconButton>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push(`/${locale}`)}>
              <WorkOutlineIcon color="primary" sx={{ mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0, fontSize: { xs: 24, sm: 28 } }} />
              <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ display: { xs: isDashboard ? 'none' : 'block', sm: 'block' } }}>
                {t('logo')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
            
            {trialStatus && (
              <Box sx={{ mr: { sm: 1 } }}>
                {trialStatus.isExpired || trialStatus.limitReached ? (
                  <Button 
                    size="small" variant="contained" color="error" 
                    startIcon={<WarningAmberIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
                    sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 'bold', px: { xs: 1.5, sm: 2 }, py: 0.5, fontSize: '0.75rem' }}
                  >
                    {t('upgrade')}
                  </Button>
                ) : (
                  <Tooltip title={t('trialTooltip', { jobs: trialStatus.jobsLeft })} arrow>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: '#fef9c3', color: '#854d0e', px: 2, py: 0.6, borderRadius: '20px', border: '1px solid #fde047', cursor: 'help' }}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" fontWeight="bold">
                        {t('trialPill', { days: trialStatus.daysLeft })}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
              </Box>
            )}

            <Button onClick={handleLanguageSwitch} sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'none', minWidth: 'auto' }}>
              <LanguageIcon sx={{ mr: { sm: isRTL ? 0 : 1 }, ml: { sm: isRTL ? 1 : 0 } }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{t('langBtn')}</Box>
            </Button>

            {trialStatus ? (
              <Button variant="outlined" color="error" onClick={handleLogout} sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 'bold', px: { xs: 2, sm: 3 }, py: { xs: 0.5, sm: 1 } }}>
                <LogoutIcon sx={{ display: { xs: 'none', sm: 'block' }, mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0, fontSize: 20 }} />
                {isRTL ? 'خروج' : 'Logout'}
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => router.push(`/${locale}/dashboard`)} sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 'bold', px: { xs: 2, sm: 3 }, py: { xs: 0.5, sm: 1 }, fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                {t('dashboardBtn')}
              </Button>
            )}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}