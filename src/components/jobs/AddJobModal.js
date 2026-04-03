import { 
  Typography, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Stack, MenuItem, CircularProgress
} from '@mui/material';

export default function AddJobModal({ t, openModal, handleClose, newJob, setNewJob, handlePostJob, isSubmitting }) {
  const titleError = newJob.title && (newJob.title.length < 3 || newJob.title.length > 60);
  const descError = newJob.description && newJob.description.length < 20;
    const isFormValid = 
    newJob.title?.length >= 3 && 
    newJob.description?.length >= 20 && 
    newJob.type && 
    newJob.location;

  return (
    <Dialog open={openModal} onClose={!isSubmitting ? handleClose : null} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
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
              value={newJob.title || ''}
              onChange={(e) => setNewJob({...newJob, title: e.target.value})}
              error={!!titleError}
              helperText={titleError ? t('errorTitleLen') : `${newJob.title?.length || 0}/60`}
              disabled={isSubmitting}
            />

            <TextField 
              select 
              label={t('employmentTypeLabel')} 
              fullWidth 
              variant="outlined"
              value={newJob.type || ''}
              onChange={(e) => setNewJob({...newJob, type: e.target.value})}
              disabled={isSubmitting}
            >
              <MenuItem value="Full-time">{t('typeFullTime')}</MenuItem>
              <MenuItem value="Part-time">{t('typePartTime')}</MenuItem>
              <MenuItem value="Contract">{t('typeContract')}</MenuItem>
              <MenuItem value="Internship">{t('typeInternship')}</MenuItem>
            </TextField>

            <TextField 
              select 
              label={t('locationLabel')} 
              fullWidth 
              variant="outlined"
              value={newJob.location || ''}
              onChange={(e) => setNewJob({...newJob, location: e.target.value})}
              disabled={isSubmitting}
            >
              <MenuItem value="Remote">{t('locRemote')}</MenuItem>
              <MenuItem value="On-site">{t('locOnSite')}</MenuItem>
              <MenuItem value="Hybrid">{t('locHybrid')}</MenuItem>
            </TextField>
            <TextField 
              label={t('jobDescriptionLabel')} 
              fullWidth 
              multiline
              rows={3}
              variant="outlined"
              value={newJob.description || ''}
              onChange={(e) => setNewJob({...newJob, description: e.target.value})}
              error={!!descError}
              helperText={descError ? t('errorDescLen') : ''}
              disabled={isSubmitting}
            />

          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} disabled={isSubmitting} sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'none' }}>
            {t('cancelBtn')}
          </Button>
          <Button 
            onClick={handlePostJob} 
            variant="contained" 
            disabled={!isFormValid || isSubmitting} 
            sx={{ borderRadius: 2, px: 4, minWidth: 140, fontWeight: 'bold', textTransform: 'none', boxShadow: 'none' }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('publishBtn')}
          </Button>
        </DialogActions>
      </Dialog>
  );
}