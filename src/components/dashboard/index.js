"use client";
// mui  +  icons
import { Typography, Box, Grid } from "@mui/material"; 
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimerIcon from "@mui/icons-material/Timer";

// components
import StatsCard from "@/components/dashboard/StatsCard"; 
// i18n
import { useTranslations } from "next-intl";
// context
import { useApp } from "@/context/AppContext";

export default function DashboardOverview() {
  const t = useTranslations('Dashboard');
  
  const { trialStatus, loadingTrial, isRTL } = useApp();
  console.log("Trial Status from Context:", trialStatus);

  const jobsCount = trialStatus?.jobsCount || 0;
  const daysLeft = trialStatus?.daysLeft || 0;
  const isExpired = trialStatus?.isExpired;
  const MAX_JOBS = 3;

  // statistics data - Dynamic Values
  const stats = [
    {
      title: t("availableTalents"),
      value: "500", 
      icon: <PeopleAltIcon color="primary" fontSize="large" />,
      bgColor: "#e0f2fe",
    },
    {
      title: t("jobsPosted"),
      value: trialStatus ? `${jobsCount} / ${MAX_JOBS}` : "...", 
      icon: <WorkHistoryIcon sx={{ color: "#d97706" }} fontSize="large" />,
      bgColor: "#fef3c7",
    },
    {
      title: t("trialPeriod"),
      value: !trialStatus 
        ? "..." 
        : isExpired 
          ? (isRTL ? "انتهت الصلاحية" : "Expired") 
          : t("daysLeft", { count: daysLeft }),
      icon: <TimerIcon sx={{ color: isExpired ? "#dc2626" : "#ea580c" }} fontSize="large" />,
      bgColor: isExpired ? "#fee2e2" : "#fff7ed", 
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: '#1e293b' }}>
        {t('title')}
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatsCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}