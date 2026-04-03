"use client";
// mui+icons
import { 
  Box, Typography, Button, Card, CardContent, 
  Stack, Chip, IconButton, Divider 
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';

// translations
import { useTranslations } from 'next-intl';

// context
import { useApp } from '@/context/AppContext';

export default function JobsList({ jobs, handleOpen }) {
  const { trialStatus } = useApp();
  const t = useTranslations('Jobs'); 

  // for safety, if jobs = empty or null
  if (jobs.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', py: 10, px: 2, border: '2px dashed #cbd5e1', 
          borderRadius: 4, bgcolor: '#f8fafc', display: 'flex',
          flexDirection: 'column', alignItems: 'center'
        }}
      >
        <Box sx={{ bgcolor: '#f1f5f9', p: 3, borderRadius: '50%', mb: 2 }}>
            <WorkOutlineIcon sx={{ fontSize: 50, color: '#94a3b8' }} />
        </Box>
        <Typography variant="h6" fontWeight="bold" color="#334155">
          {t('noJobs')}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: '450px' }}>
          {trialStatus?.isExpired || trialStatus?.limitReached
            ? t('trialExpiredUpgrade')
            : t('createFirstJob')
          }
        </Typography>

        {trialStatus?.isExpired || trialStatus?.limitReached ? (
          <Button variant="contained" color="primary" startIcon={<LockOpenIcon />} sx={{ borderRadius: '50px', textTransform: 'none', fontWeight: 'bold', px: 5, py: 1.2 }}>
            {t('upgradeNow')}
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleOpen} sx={{ borderRadius: '50px', textTransform: 'none', fontWeight: 'bold', px: 4, py: 1, borderWidth: 2 }}>
            {t('postNewJob')}
          </Button>
        )}
      </Box>
    );
  }
  // if there are jobs, we show them in a grid
  return (
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
        gap: 3, 
        alignItems: 'stretch',
        
        maxHeight: 'calc(100vh - 180px)', 
        overflowY: 'auto', 
        pb: 4, 
        px: 1, 
        
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { 
          background: '#cbd5e1', 
          borderRadius: '10px' 
        },
        '&::-webkit-scrollbar-thumb:hover': { background: '#94a3b8' },
      }}
    >
      {jobs.filter(j => j !== null && j !== undefined).map((job, index) => {
        const isNewest = index === 0;

        return (
          <Card 
            key={job.id || index}
            sx={{ 
              width: '100%',
              height: '100%',
              minHeight: '280px',
              borderRadius: 4, 
              display: 'flex',
              flexDirection: 'column',
              border: isNewest ? '2px solid #0ea5e9' : '1px solid #e2e8f0', 
              boxShadow: isNewest ? '0 12px 24px rgba(14, 165, 233, 0.12)' : '0 4px 12px rgba(0,0,0,0.03)', 
              transition: 'all 0.3s ease', 
              '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' } 
            }}
          >
            <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              
                {/* Top Section: Badges & Menu */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Chip 
                    label={job?.status || t('active')} 
                    size="small" 
                    sx={{ fontWeight: 'bold', bgcolor: '#dcfce7', color: '#166534', borderRadius: 1.5, fontSize: '0.75rem' }} 
                  />
                  {isNewest && (
                    <Chip 
                      label={t('new')} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 'bold', height: 24, fontSize: '0.75rem' }} 
                    />
                  )}
                </Stack>
                <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
              </Stack>

              {/* Job Title */}
              <Typography 
                variant="h5" 
                fontWeight="800" 
                color="#1e293b" 
                sx={{ mb: 2, lineHeight: 1.3, wordBreak: 'break-word' }}
              >
                {job?.title || t('untitledRole')}
              </Typography>

              {/* Job Description */}
              <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5, color: '#64748b' }}>
                    <DescriptionIcon sx={{ fontSize: 18 }} />
                    <Typography variant="caption" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {t('jobDescription')}
                    </Typography>
                  </Stack>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 4, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden',
                      lineHeight: 1.6,
                      wordBreak: 'break-word'
                    }}
                  >
                    {job?.description || t('noDescription')}
                  </Typography>
              </Box>
              
              {/* Footer Section */}
              <Box sx={{ mt: 'auto' }}>
                <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                    <Stack direction="row" alignItems="center" gap={1} color="#475569">
                      <WorkOutlineIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2" fontWeight="600">{job?.type || t('remote')}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} color="#475569">
                      <LocationOnIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2" fontWeight="600">{job?.location}</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1} color="#94a3b8" sx={{ mt: 1 }}>
                    <CalendarMonthIcon sx={{ fontSize: 16 }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: '500' }}>
                        {t('published')}{job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : t('today')}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}