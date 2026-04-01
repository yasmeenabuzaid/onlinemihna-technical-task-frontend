// mui + icons
import {
    Box, Typography, TextField, InputAdornment, List, ListItemButton,
    ListItemAvatar, Avatar, ListItemText, Stack,
    IconButton, Pagination, Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// context
import { useApp } from '@/context/AppContext';

// i18n
import { useTranslations } from 'next-intl';

// data
import { allTalents } from '@/data/talentsData';
//hooks
import { useState, useMemo, useEffect } from 'react';


export default function SidebarTalents({ selectedTalent, setSelectedTalent }) {
    const { isRTL } = useApp();
    const t = useTranslations('Talents');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 12; 

    // filter talents based on search term
    const filteredTalents = useMemo(() => {
        return allTalents.filter(talent =>
            talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]); // run filter only when searchTerm changes

    // pagination logic
    const totalPages = Math.ceil(filteredTalents.length / itemsPerPage);
    const currentTalents = filteredTalents.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // select first talent if current selected is not in the filtered list anymore
    useEffect(() => {
        if (currentTalents.length > 0 && (!selectedTalent || !currentTalents.find(t => t.id === selectedTalent.id))) {
            setSelectedTalent(currentTalents[0]);
        } else if (currentTalents.length === 0) {
            setSelectedTalent(null);
        }
    }, [currentTalents, setSelectedTalent]); 

    return (
        <Box
            sx={{
                width: { xs: '100%', md: 360 }, 
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRight: isRTL ? 0 : '1px solid #e2e8f0',
                borderLeft: isRTL ? '1px solid #e2e8f0' : 0,
                bgcolor: '#ffffff'
                
            }}
        >
            {/*filter and search*/}
            <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                        }}
                        sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <Tooltip title="Filter by Role/Status">
                        <IconButton sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                            <FilterListIcon color="action" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>

            {/* list */}
            <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                {currentTalents.map((talent) => (
                    <ListItemButton
                        key={talent.id}
                        selected={selectedTalent?.id === talent.id}
                        onClick={() => setSelectedTalent(talent)}
                        sx={{
                            borderBottom: '1px solid #f1f5f9',
                            py: 1.5,
                            px: 2,
                            transition: 'all 0.2s',
                            '&.Mui-selected': {
                                bgcolor: '#f0f9ff',
                                borderRight: isRTL ? 0 : '4px solid #0ea5e9',
                                borderLeft: isRTL ? '4px solid #0ea5e9' : 0,
                            },
                            '&:hover': { bgcolor: '#f8fafc' }
                        }}
                    >
                        <ListItemAvatar sx={{ minWidth: 50 }}>
                            <Avatar sx={{ width: 40, height: 40, fontWeight: 'bold', bgcolor: selectedTalent?.id === talent.id ? '#0ea5e9' : '#cbd5e1' }}>
                                {talent.name.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="subtitle2" fontWeight="700" color="#1e293b">{talent.name}</Typography>}
                            secondary={<Typography variant="caption" color="text.secondary" noWrap>{talent.role}</Typography>}
                        />
                    </ListItemButton>
                ))}
            </List>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ p: 1.5, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', bgcolor: '#f8fafc' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, val) => setPage(val)}
                        size="small"
                        color="primary"
                        siblingCount={0} 
                    />
                </Box>
            )}
        </Box>
    );
}