import { Typography, Stack, Alert, LinearProgress, Card } from '@mui/material';

export default function TrialLimit({ t, jobs, isLimitReached, MAX_JOBS, progressPercentage }) {
  return (
   <Card sx={{ mb: 5, p: 3, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
            Free Trial Quota
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={isLimitReached ? 'error.main' : 'primary.main'}>
            {jobs.length} / {MAX_JOBS} Jobs Posted
          </Typography>
        </Stack>
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage} 
          color={isLimitReached ? "error" : "primary"}
          sx={{ height: 8, borderRadius: 4, bgcolor: '#e2e8f0' }}
        />
        {isLimitReached && (
          <Alert severity="warning" sx={{ mt: 2, borderRadius: 2, '& .MuiAlert-message': { fontWeight: '500' } }}>
            {t('limitReachedMessage')}
          </Alert>
        )}
      </Card>
  );
}