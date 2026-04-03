"use client";
import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslations } from 'next-intl';

// API & Context
import { BackendConnector } from '@/services/backendConnector';
import { useApp } from '@/context/AppContext';

// components
import TrialLimit from './TrialLimit';
import JobsList from './JobsList';
import AddJobModal from './AddJobModal';

export default function JobsPage() {
  const t = useTranslations('Jobs');
  const { trialStatus, startTrialSession } = useApp(); 
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', type: '', location: '', description: '' });

  const MAX_JOBS = 3;
  const isLimitReached = trialStatus?.limitReached || jobs.length >= MAX_JOBS;
  const progressPercentage = (jobs.length / MAX_JOBS) * 100;

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await BackendConnector.getJobs();
          // check if response is already an array, if not try to access data or data.data
      const jobsArray = Array.isArray(response) ? response : (response.data || []); 
      setJobs(jobsArray);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleOpen = () => !isLimitReached && setOpenModal(true);
  
  const handleClose = () => {
    setOpenModal(false);
    setNewJob({ title: '', type: '', location: '', description: '' }); 
  };

  const handlePostJob = async () => {
    try {
      const response = await BackendConnector.createJob(newJob);
      await fetchJobs(); 
      await startTrialSession(); 
      handleClose();
    } catch (error) {
      alert(error.response?.data?.error || error.message || "Limit reached or Server Error");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 2, md: 4 }, width: '100%', flexGrow: 1 }}>
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
          disabled={isLimitReached || trialStatus?.isExpired}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none', 
            px: 3, 
            py: 1.2, 
            fontWeight: 'bold',
            boxShadow: isLimitReached ? 'none' : '0 4px 12px rgba(14, 165, 233, 0.3)'
          }}
        >
          {t('postNewJob')}
        </Button>
      </Stack>

      <TrialLimit 
        jobs={jobs} 
        t={t} 
        isLimitReached={isLimitReached} 
        MAX_JOBS={MAX_JOBS} 
        progressPercentage={progressPercentage} 
      />
      
      <JobsList jobs={jobs} loading={loading} handleOpen={handleOpen} />

      <AddJobModal 
        openModal={openModal} 
        handleClose={handleClose}
        newJob={newJob}
        setNewJob={setNewJob}
        handlePostJob={handlePostJob}
        t={t}
      />
    </Container>
  );
}