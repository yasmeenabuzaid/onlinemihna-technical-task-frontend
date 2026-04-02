"use client";

import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout'; 
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useApp } from '@/context/AppContext'; 

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); 
  const t = useTranslations('Navbar');
  
  const { trialStatus, isRTL } = useApp();

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

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e2e8f0',
        py: 0.5 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => router.push(`/${locale}`)} 
          >
            <WorkOutlineIcon color="primary" sx={{ mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0, fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {t('logo')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            
            <Button 
              onClick={handleLanguageSwitch}
              startIcon={!isRTL ? <LanguageIcon /> : null}
              endIcon={isRTL ? <LanguageIcon /> : null} 
              sx={{ 
                color: 'text.secondary', 
                fontWeight: 'bold',
                textTransform: 'none'
              }}
            >
              {t('langBtn')}
            </Button>

            {trialStatus ? (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleLogout} 
                startIcon={<LogoutIcon />}
                sx={{ 
                  borderRadius: '20px', 
                  textTransform: 'none', 
                  fontWeight: 'bold',
                  px: 3
                }}
              >
                {isRTL ? 'تسجيل خروج' : 'Logout'}
              </Button>
            ) : (
              <Button 
                variant="contained"
                color="primary" 
                onClick={() => router.push(`/${locale}/dashboard/talents`)} 
                sx={{ 
                  borderRadius: '20px', 
                  textTransform: 'none', 
                  fontWeight: 'bold',
                  px: 3
                }}
              >
                {t('dashboardBtn')}
              </Button>
            )}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}