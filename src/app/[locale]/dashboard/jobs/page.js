"use client";

import { Box } from '@mui/material';
import JobsPage from '@/components/jobs/index';

export default function Jobs() {

  return (
    <Box sx={{  width: '90%', minHeight: '100%' }}>
      <JobsPage />
    </Box>
  );
}