"use client";
// mui + icons
import React from 'react';
import { 
  Box, Typography, Paper, Avatar, Stack, Button, Grid, 
  IconButton, MenuItem, Select, FormControl, Chip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

// translations
import { useTranslations } from 'next-intl';

export default function TalentDetails({ selectedTalent, handleStatusChange }) {
  const t = useTranslations('Talents');

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        display: { xs: selectedTalent ? 'flex' : 'none', md: 'flex' }, 
        flexDirection: 'column',
        bgcolor: '#f8fafc', 
        overflowY: 'auto',
      }}
    >
      {selectedTalent ? (
        <Box sx={{  width: '100%', mx: 'auto' }}> 
          
          <Paper sx={{ p: 3, borderRadius: 3, mb: 2.5, boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ xs: 'center', sm: 'flex-start' }} textAlign={{ xs: 'center', sm: 'left' }}>
              
              <Avatar sx={{ width: 80, height: 80, fontSize: '2rem', bgcolor: '#0ea5e9', boxShadow: '0 4px 10px rgba(14, 165, 233, 0.2)' }}>
                {selectedTalent.name.charAt(0)}
              </Avatar>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="800" color="#0f172a" sx={{ mb: 0.5 }}>
                  {selectedTalent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ mb: 1.5 }}>
                  {selectedTalent.role}
                </Typography>
                
                <Stack direction="row" spacing={0.5} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                  <IconButton size="small" sx={{ bgcolor: '#f1f5f9', color: '#0077b5', width: 32, height: 32 }}><LinkedInIcon fontSize="small" /></IconButton>
                  <IconButton size="small" sx={{ bgcolor: '#f1f5f9', color: '#333', width: 32, height: 32 }}><GitHubIcon fontSize="small" /></IconButton>
                  <IconButton size="small" sx={{ bgcolor: '#f1f5f9', color: '#0ea5e9', width: 32, height: 32 }}><LanguageIcon fontSize="small" /></IconButton>
                </Stack>
              </Box>

              <Box sx={{ minWidth: 130 }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedTalent.status || 'Available'}
                    onChange={handleStatusChange}
                    sx={{ 
                      borderRadius: 2, 
                      fontWeight: 'bold',
                      fontSize: '0.875rem', 
                      height: 36, 
                      bgcolor: selectedTalent.status === 'Hired' ? '#dcfce7' : selectedTalent.status === 'In Review' ? '#fef9c3' : '#e0f2fe',
                      color: selectedTalent.status === 'Hired' ? '#166534' : selectedTalent.status === 'In Review' ? '#854d0e' : '#0369a1',
                      '& fieldset': { border: 'none' }
                    }}
                  >
                    <MenuItem sx={{ fontSize: '0.875rem' }} value="Available">Available</MenuItem>
                    <MenuItem sx={{ fontSize: '0.875rem' }} value="In Review">In Review</MenuItem>
                    <MenuItem sx={{ fontSize: '0.875rem' }} value="Hired">Hired</MenuItem>
                    <MenuItem sx={{ fontSize: '0.875rem' }} value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase">
                  {t('columns.experience')}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1.5} sx={{ mt: 1 }}>
                  <Avatar sx={{ bgcolor: '#f1f5f9', width: 32, height: 32 }}><WorkOutlineIcon fontSize="small" color="action" /></Avatar>
                  <Typography variant="body2" fontWeight="600" color="#1e293b">{selectedTalent.experience}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={7}>
                <Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase">
                  {t('columns.skills')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mt: 1 }}>
                  {selectedTalent.skills.map(skill => (
                    <Chip 
                      key={skill} 
                      label={skill} 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f8fafc', 
                        border: '1px solid #cbd5e1', 
                        fontWeight: '500',
                        fontSize: '0.75rem' 
                      }} 
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Stack direction="row" gap={1.5} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon fontSize="small" />} 
              sx={{ borderRadius: 2, textTransform: 'none', px: 2.5, py: 0.8, fontWeight: 'bold', fontSize: '0.875rem' }}
            >
              Download CV
            </Button>
            <Button 
              variant="contained" 
              startIcon={<EmailIcon fontSize="small" />} 
              sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 0.8, fontWeight: 'bold', boxShadow: 'none', fontSize: '0.875rem' }}
            >
              Send Message
            </Button>
          </Stack>

        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
          <Typography variant="body1">Select a talent to view profile</Typography>
        </Box>
      )}
    </Box>
  );
}