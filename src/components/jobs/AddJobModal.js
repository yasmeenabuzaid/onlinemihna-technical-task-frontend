import { 
  Typography, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Stack
} from '@mui/material';

export default function AddJobModal({ t, openModal, handleClose, newJob, setNewJob, handlePostJob }) {
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: '800', fontSize: '1.5rem', color: '#0f172a' }}>
          {t('modalTitle')}
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t('modalDescription')}
          </Typography>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField 
              label={t('jobTitleLabel')} 
              fullWidth 
              variant="outlined"
              value={newJob.title}
              onChange={(e) => setNewJob({...newJob, title: e.target.value})}
            />
            <TextField 
              label={t('employmentTypeLabel')} 
              fullWidth 
              variant="outlined"
              value={newJob.type}
              onChange={(e) => setNewJob({...newJob, type: e.target.value})}
            />
            <TextField 
              label={t('jobDescriptionLabel')} 
              fullWidth 
              multiline
              rows={3}
              variant="outlined"
              value={newJob.description}
              onChange={(e) => setNewJob({...newJob, description: e.target.value})}
            />
            <TextField 
              label={t('locationLabel')} 
              fullWidth 
              variant="outlined"
              value={newJob.location}
              onChange={(e) => setNewJob({...newJob, location: e.target.value})}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'none' }}>
            {t('cancelBtn')}
          </Button>
          <Button 
            onClick={handlePostJob} 
            variant="contained" 
            disabled={!newJob.title || !newJob.location}
            sx={{ borderRadius: 2, px: 4, fontWeight: 'bold', textTransform: 'none', boxShadow: 'none' }}
          >
            {t('publishBtn')}
          </Button>
        </DialogActions>
      </Dialog>
  );
}