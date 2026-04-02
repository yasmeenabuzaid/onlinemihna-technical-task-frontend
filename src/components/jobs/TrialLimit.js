"use client";
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl'; 

export default function TrialLimit({ jobs = [] }) {
  const { trialStatus } = useApp();
  const t = useTranslations('Trial'); 
  
  const MAX_JOBS = 3;
  const currentCount = Math.max(jobs.length, trialStatus?.usedJobs || 0);
  const isLimitReached = trialStatus?.limitReached || currentCount >= MAX_JOBS;
  const progressPercentage = (currentCount / MAX_JOBS) * 100;

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold" color="#64748b">
          {t('quotaTitle')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={isLimitReached ? 'error' : 'primary'}>
          {currentCount} / {MAX_JOBS} {t('jobsPosted')} 
        </Typography>
      </Box>

      <LinearProgress 
        variant="determinate" 
        value={progressPercentage > 100 ? 100 : progressPercentage} 
        sx={{ 
          height: 8, 
          borderRadius: 5, 
          bgcolor: '#f1f5f9',
          '& .MuiLinearProgress-bar': {
            bgcolor: isLimitReached ? '#ef4444' : '#0ea5e9'
          }
        }} 
      />

      {isLimitReached && (
        <Box sx={{ 
          display: 'flex', alignItems: 'center', gap: 1, mt: 2, p: 1.5, 
          bgcolor: '#fff7ed', borderRadius: 2, border: '1px solid #ffedd5' 
        }}>
          <ErrorOutlineIcon sx={{ color: '#c2410c', fontSize: 20 }} />
          <Typography variant="caption" color="#c2410c" fontWeight="600">
            {t('limitWarning')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}