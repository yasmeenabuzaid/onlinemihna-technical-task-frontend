"use client";

import {
  Box, Typography, Avatar, Chip, Divider, Select, MenuItem , Button,
  FormControl, Stack, Link
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
 import LockIcon from '@mui/icons-material/Lock';   
export default function TalentDetails({ selectedTalent, handleStatusChange ,isExpired}) {

  // حماية: إذا ما في موهبة محددة
  if (!selectedTalent) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#fafafa', p: 4 }}>
        <Typography color="text.secondary" variant="h6">
          Please select a talent from the list to view details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: '#fafafa', overflowY: 'auto' }}>
      
      {/* Header Profile */}
<Box sx={{ 
        display: 'flex', alignItems: 'center', gap: 2, mb: 4,
        filter: isExpired ? 'blur(4px)' : 'none', // تغبيش الاسم والصورة
        pointerEvents: isExpired ? 'none' : 'auto' 
      }}>        <Avatar sx={{ width: 80, height: 80, bgcolor: '#0ea5e9', fontSize: '2.5rem', fontWeight: 'bold' }}>
          {selectedTalent.name ? selectedTalent.name.charAt(0) : '?'}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="800" color="#0f172a">
            {selectedTalent.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight="500">
            {selectedTalent.role}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Experience: {selectedTalent.experience}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Status Update */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: '#334155' }}>
          Candidate Status
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedTalent.status || 'Available'}
            onChange={handleStatusChange}
            sx={{ bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Hired">Hired</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Skills */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: '#334155' }}>
          Technical Skills
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
          {/* الكود السحري اللي بيمنع إيرور الـ map */}
          {typeof selectedTalent.skills === 'string'
            ? selectedTalent.skills.split(',').map((skill, index) => (
                <Chip
                  key={index}
                  label={skill.trim()}
                  size="small"
                  sx={{ fontWeight: 600, bgcolor: '#e0f2fe', color: '#0369a1', borderRadius: 1.5 }}
                />
              ))
            : selectedTalent.skills?.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  sx={{ fontWeight: 600, bgcolor: '#e0f2fe', color: '#0369a1', borderRadius: 1.5 }}
                />
              ))
          }
        </Box>
      </Box>

      {/* Contact & Links */}
      <Box sx={{ 
        filter: isExpired ? 'blur(6px)' : 'none', 
        pointerEvents: isExpired ? 'none' : 'auto',
        userSelect: isExpired ? 'none' : 'auto' 
      }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2, color: '#334155' }}>
          Contact & Profiles
        </Typography>
        <Stack spacing={2.5}>
          {selectedTalent.email && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon color="action" fontSize="small" />
              <Typography variant="body2" color="#475569">{selectedTalent.email}</Typography>
            </Box>
          )}
          {selectedTalent.linkedinUrl && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LinkedInIcon color="primary" fontSize="small" />
              <Link href={selectedTalent.linkedinUrl} target="_blank" variant="body2" underline="hover" color="#0ea5e9">
                LinkedIn Profile
              </Link>
            </Box>
          )}
          {selectedTalent.githubUrl && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <GitHubIcon sx={{ color: '#1e293b' }} fontSize="small" />
              <Link href={selectedTalent.githubUrl} target="_blank" variant="body2" underline="hover" color="#0ea5e9">
                GitHub Profile
              </Link>
            </Box>
          )}
        </Stack>
      </Box>
{isExpired && (
        <Box sx={{
          position: 'absolute', top: -30, left: 140, width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.5)', zIndex: 10, textAlign: 'center', p: 3
        }}>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <LockIcon sx={{ fontSize: 50, color: '#0ea5e9', mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>Trial Expired</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
              Your 7-day access has ended. Upgrade now to see full talent profiles and contact info.
            </Typography>
            <Button variant="contained" size="large" sx={{ borderRadius: '50px', px: 4 }}>
              Upgrade to Pro
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}