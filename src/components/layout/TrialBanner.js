"use client";

import { Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl'; 

export default function TrialBanner() {
  const { trialStatus, loadingTrial } = useApp();
  const t = useTranslations('TrialBanner'); 

  if (loadingTrial || !trialStatus) return null;

  if (trialStatus.isExpired || trialStatus.limitReached) {
    return (
      <Box 
        sx={{ 
          bgcolor: '#fef2f2', 
          borderBottom: '1px solid #fecaca', 
          p: 1.5, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2, 
          flexWrap: 'wrap',
          zIndex: 10
        }}
      >
        <WarningAmberIcon color="error" fontSize="small" />
        <Typography variant="body2" color="#b91c1c" fontWeight="bold">
          {trialStatus.isExpired ? t('expiredWarning') : t('limitWarning')}
        </Typography>
        <Button size="small" variant="contained" color="error" sx={{ textTransform: 'none', px: 3, borderRadius: 2 }}>
          {t('upgradeBtn')}
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        bgcolor: '#fffedd', 
        borderBottom: '1px solid #fef08a', 
        p: 1.5, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 2,
        zIndex: 10
      }}
    >
      <InfoOutlinedIcon sx={{ color: '#854d0e' }} fontSize="small" />
      <Typography variant="body2" color="#854d0e" fontWeight="600">
        {t('activeStatus', { 
          daysLeft: trialStatus.daysLeft, 
          jobsLeft: trialStatus.jobsLeft 
        })}
      </Typography>
    </Box>
  );
}