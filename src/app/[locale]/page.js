"use client";

// mui + icons
import { Box, Typography, Button, Container, Stack } from '@mui/material'; 
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useTranslations } from 'next-intl';

// files
import { useRouter } from '@/navigation'; 
import { useApp } from '@/context/AppContext'; 

export default function LandingPage() {
  const router = useRouter(); 
  // useRouter -> the custom hook we created in navigation.js to handle navigation and locale

  // get locale and translations from context
  const { locale } = useApp();

  // key for translations
  const t = useTranslations('Landing');

  const handleStartTrial = () => {
    router.push('/dashboard');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        py: 8
      }}
    >
      <Container maxWidth="md">
        {/* Start Hero Section */}
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
        >
          <Box
            sx={{
              backgroundColor: '#e0f2fe',
              p: 2.5,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <WorkOutlineIcon color="primary" sx={{ fontSize: 45 }} />
          </Box>

          <Box>
            <Typography variant="h2" component="h1" fontWeight="800" color="text.primary">
              {t('heroTitle')}
            </Typography>
            <Typography variant="h4" fontWeight="600" color="primary.main">
              {t('heroSubtitle')}
            </Typography>
          </Box>

          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px' }}>
            {t.rich('heroDesc', {
              b: (chunks) => <b>{chunks}</b>
            })}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleStartTrial}
            sx={{
              px: 6, py: 2, borderRadius: '50px', textTransform: 'none', fontWeight: 'bold'
            }}
          >
            {t('startTrial')}
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ color: '#10b981' }}>✓</span> {t('noCredit')}
            <span>•</span>
            <span style={{ color: '#10b981' }}>✓</span> {t('postJobs')}
          </Typography>
        </Stack>
        {/*  End Hero Section */}
      </Container>
    </Box>
  );
}