"use client";

import { Box } from '@mui/material';
import JobsPage from '@/components/jobs/index';

export default function Jobs() {

  return (
    <Box sx={{  width: '100%', minHeight: '100%' }}>
      <JobsPage />
    </Box>
  );
}