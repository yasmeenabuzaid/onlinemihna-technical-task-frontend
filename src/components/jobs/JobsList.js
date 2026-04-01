import { Box, Typography, Button, Grid, Card, CardContent, Stack, Chip, IconButton } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star'; 

export default function JobsList({ jobs, handleOpen }) {
    // If there are no jobs, show the empty state
  if (jobs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10, px: 2, border: '2px dashed #cbd5e1', borderRadius: 4, bgcolor: '#f8fafc' }}>
        <WorkOutlineIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
        <Typography variant="h6" fontWeight="bold" color="#334155" gutterBottom>
          No jobs posted yet
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Create your first job posting to start receiving applicants from our talent pool.
        </Typography>
        <Button variant="outlined" onClick={handleOpen} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}>
          Post a Job Now
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {jobs.map((job, index) => {
        const isNewest = index === 0; // The most recently added job will be at index 0
        const jobNumber = jobs.length - index;  // To show the most recent job as #1

        return (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={job.id}>
            <Card 
              sx={{ 
                borderRadius: 3, 
                border: isNewest ? '2px solid #0ea5e9' : '1px solid #e2e8f0', 
                boxShadow: isNewest ? '0 8px 24px rgba(14, 165, 233, 0.15)' : '0 4px 12px rgba(0,0,0,0.02)', 
                transition: 'all 0.3s', 
                position: 'relative', 
                '&:hover': { transform: 'translateY(-4px)', borderColor: isNewest ? '#0ea5e9' : '#cbd5e1' } 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="caption" fontWeight="800" color={isNewest ? 'primary.main' : 'text.disabled'} sx={{ letterSpacing: 1 }}>
                    JOB #{jobNumber}
                  </Typography>
                  
                  {isNewest && (
                    <Chip 
                      label="Just Added" 
                      size="small" 
                      color="primary" 
                      icon={<StarIcon fontSize="small" />} 
                      sx={{ fontWeight: 'bold', height: 24, fontSize: '0.7rem' }} 
                    />
                  )}
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Chip label={job.status} size="small" color="success" sx={{ fontWeight: 'bold', bgcolor: '#dcfce7', color: '#166534' }} />
                  <IconButton size="small"><MoreVertIcon /></IconButton>
                </Stack>
                
                <Typography variant="h6" fontWeight="bold" color="#0f172a" gutterBottom>
                  {job.title}
                </Typography>
                
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.5, color: 'text.secondary' }}>
                  <WorkOutlineIcon fontSize="small" />
                  <Typography variant="body2">{job.type || 'Remote / Full-Time'}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.5, color: 'text.secondary' }}>
                  <WorkOutlineIcon fontSize="small" />
                  <Typography variant="body2">{job.description || 'Job description will be available soon.'}</Typography>
                </Stack>
                
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 3, color: 'text.secondary' }}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">{job.location}</Typography>
                </Stack>

                <Typography variant="caption" color="text.disabled" display="block" textAlign="right">
                  Posted on {job.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}