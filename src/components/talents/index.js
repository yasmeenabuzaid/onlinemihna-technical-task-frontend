"use client";
// hooks
import { useState, useMemo } from 'react';

// mui
import { Box, Typography, Paper } from '@mui/material';

// i18n
import { useTranslations } from 'next-intl'; 

// data
import { allTalents } from '@/data/talentsData';
// components
import SidebarTalents from './SidebarTalents';
import TalentDetails from './TalentDetails';


export default function TalentsPage() {
    const t = useTranslations('Talents');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTalent, setSelectedTalent] = useState(null);


    // filter talents  
    const filteredTalents = useMemo(() => {
        return allTalents.filter(talent =>
            talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]); // run filter only when searchTerm changes

    const handleStatusChange = (event) => {
        setSelectedTalent({ ...selectedTalent, status: event.target.value });
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 2, color: '#0f172a' }}>
                {t('title')} <Typography component="span" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 'normal' }}>({filteredTalents.length} found)</Typography>
            </Typography>

            <Paper
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0'
                }}
            >
                {/* sidebar + list */}
                <SidebarTalents
                    selectedTalent={selectedTalent}
                    setSelectedTalent={setSelectedTalent}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filteredTalents={filteredTalents}
                />
                {/* details */}
                <TalentDetails
                    selectedTalent={selectedTalent}
                    handleStatusChange={handleStatusChange}
                />
            </Paper>
        </Box>
    );
}
