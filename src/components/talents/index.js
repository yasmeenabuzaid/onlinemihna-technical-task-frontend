"use client";
import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, useTheme, useMediaQuery } from '@mui/material';   
import { useTranslations } from 'next-intl'; 
import { BackendConnector } from '../../services/backendConnector'; 
import { useApp } from '@/context/AppContext'; 
import SidebarTalents from './SidebarTalents';
import TalentDetails from './TalentDetails';

export default function TalentsPage() {
    const t = useTranslations('Talents');
    const { trialStatus } = useApp();
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [talents, setTalents] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTalent, setSelectedTalent] = useState(null);
    
    const [showMobileDetails, setShowMobileDetails] = useState(false);

    useEffect(() => {
        const fetchTalents = async () => {
            try {
                setLoading(true);
                const response = await BackendConnector.getTalents(1, 500); 
                const fetchedArray = Array.isArray(response.data) ? response.data : 
                                     (Array.isArray(response.data?.data) ? response.data.data : []);
                setTalents(fetchedArray);
            } catch (error) {
                console.error("Error fetching talents:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTalents();
    }, []);

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
                    flexDirection: 'row', 
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    position: 'relative' 
                }}
            >
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {(!isMobile || !showMobileDetails) && (
                            <SidebarTalents
                                selectedTalent={selectedTalent}
                                setSelectedTalent={setSelectedTalent}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                filteredTalents={filteredTalents}
                                isMobile={isMobile}
                                setShowMobileDetails={setShowMobileDetails}
                            />
                        )}
                        
                        {(!isMobile || showMobileDetails) && (
                            <TalentDetails
                                selectedTalent={selectedTalent}
                                handleStatusChange={handleStatusChange}
                                isExpired={trialStatus?.isExpired}
                                isMobile={isMobile}
                                setShowMobileDetails={setShowMobileDetails}
                            />
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
}