"use client";

import { Box, Typography, Button, Container, Stack } from '@mui/material'; 
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/navigation'; 
import { useApp } from '@/context/AppContext'; 

export default function LandingPage() {
  const router = useRouter(); 
  const { locale } = useApp();
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
        py: { xs: 2, md: 4 }, 
        px: { xs: 1, md: 0 } 
      }}
    >
      <Container maxWidth="md">
        <Stack
          spacing={{ xs: 3, md: 4 }} 
          alignItems="center"
          textAlign="center"
        >
          <Box
            sx={{
              backgroundColor: '#e0f2fe',
              p: { xs: 2, md: 2.5 },  
              borderRadius: '25%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <WorkOutlineIcon color="primary" sx={{ fontSize: { xs: 35, md: 45 } }} />
          </Box>

          <Box>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="800" 
              color="text.primary"
              sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '3.75rem' }, lineHeight: 1.2, mb: 1 }}
            >
              {t('heroTitle')}
            </Typography>
            <Typography 
              variant="h4" 
              fontWeight="600" 
              color="primary.main"
              sx={{ fontSize: { xs: '1.25rem', md: '2.125rem' } }}
            >
              {t('heroSubtitle')}
            </Typography>
          </Box>

          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '600px',
              fontSize: { xs: '1rem', md: '1.25rem' } 
            }}
          >
            {t.rich('heroDesc', {
              b: (chunks) => <b>{chunks}</b>
            })}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleStartTrial}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              px: { xs: 3, md: 6 }, 
              py: { xs: 1.5, md: 2 }, 
              borderRadius: '25px', 
              textTransform: 'none', 
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            {t('startTrial')}
          </Button>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap' 
            }}
          >
            <span style={{ color: '#10b981' }}>✓</span> {t('noCredit')}
            <span style={{ display: 'inline-block', margin: '0 8px' }}>•</span>
            <span style={{ color: '#10b981' }}>✓</span> {t('postJobs')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}