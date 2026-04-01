"use client";
// hook
import { useState } from 'react';
// MUI + icons
import { 
  Box, Typography, Button,  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

//translation
import { useTranslations } from 'next-intl';

//components
import TrialLimit from './TrialLimit';
import JobsList from './JobsList';
import AddJobModal from './AddJobModal';


export default function JobsPage() {
  const t = useTranslations('Jobs');
  
  const [jobs, setJobs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', type: '', location: '' });

  const MAX_JOBS = 3; // limit for trial users
  const isLimitReached = jobs.length >= MAX_JOBS;
  const progressPercentage = (jobs.length / MAX_JOBS) * 100; 

  const handleOpen = () => !isLimitReached && setOpenModal(true);
  
  const handleClose = () => {
    setOpenModal(false);
    setNewJob({ title: '', type: '', location: '' }); 
  };

  const handlePostJob = () => {
    if (newJob.title && newJob.location) {
      const jobToAdd = {
        ...newJob,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        status: 'Active'
      };
      setJobs([jobToAdd, ...jobs]); 
      handleClose();
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: '100%', flexGrow: 1, minHeight: '100%' }}>
      {/* Header */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={3} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" color="#0f172a" gutterBottom>
            {t('title')}
          </Typography>
          <Typography color="text.secondary">
            Manage your job postings and find the right talent.
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpen}
          disabled={isLimitReached}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1.2, fontWeight: 'bold', boxShadow: isLimitReached ? 'none' : '0 4px 12px rgba(14, 165, 233, 0.3)' }}
        >
          {t('postNewJob')}
        </Button>
      </Stack>

      {/* Trial Limit Component */}
      <TrialLimit jobs={jobs} t={t} isLimitReached={isLimitReached} MAX_JOBS={MAX_JOBS} progressPercentage={progressPercentage} />

      {/* Jobs List Component */}
      <JobsList jobs={jobs} handleOpen={handleOpen} />

      {/* Modal */}
     <AddJobModal 
        openModal={openModal} 
        handleClose={handleClose}
        newJob={newJob}
        setNewJob={setNewJob}
        handlePostJob={handlePostJob}
        t={t}
      />
    </Box>
  );
}