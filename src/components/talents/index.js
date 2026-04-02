"use client";
// hooks
import { useState, useMemo, useEffect } from 'react';

// mui
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

// i18n
import { useTranslations } from 'next-intl'; 

// api connector
import {BackendConnector} from '../../services/backendConnector'; 
import { useApp } from '@/context/AppContext'; 

// components
import SidebarTalents from './SidebarTalents';
import TalentDetails from './TalentDetails';

export default function TalentsPage() {
    const t = useTranslations('Talents');
const { trialStatus } = useApp();
    // === States ===
    const [talents, setTalents] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTalent, setSelectedTalent] = useState(null);

 // === Fetch Data ===
    useEffect(() => {
        const fetchTalents = async () => {
            try {
                setLoading(true);
                const response = await BackendConnector.getTalents(1, 50); 
                
                const fetchedArray = Array.isArray(response.data) ? response.data : 
                                     (Array.isArray(response.data?.data) ? response.data.data : []);
                                     
                console.log("Safe Talents Array:", fetchedArray); 
                setTalents(fetchedArray);

            } catch (error) {
                console.error("Error fetching talents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTalents();
    }, []);

    // === Filter Logic ===
    const filteredTalents = useMemo(() => {
        if (!Array.isArray(talents)) return [];

        return talents.filter(talent => {
            const name = talent?.name || '';
            const role = talent?.role || '';
            const search = searchTerm || '';
            
            return name.toLowerCase().includes(search.toLowerCase()) ||
                   role.toLowerCase().includes(search.toLowerCase());
        });
    }, [searchTerm, talents]);



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
                    border: '1px solid #e2e8f0',
                    position: 'relative' 
                }}
            >
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
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
                            isExpired={trialStatus?.isExpired}
                        />
                    </>
                )}
            </Paper>
        </Box>
    );
}