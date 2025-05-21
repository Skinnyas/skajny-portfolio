import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import WebIcon from '@mui/icons-material/Web';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BrushIcon from '@mui/icons-material/Brush';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    borderBottom: `4px solid ${theme.palette.primary.main}`,
  },
}));

const services = [
  {
    icon: <WebIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Webové stránky',
    description: 'Profesionální webové stránky šité na míru vašim potřebám. Od jednoduchých prezentací po komplexní firemní weby.'
  },
  {
    icon: <PhoneIphoneIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Mobilní aplikace',
    description: 'Nativní i hybridní mobilní aplikace pro platformy iOS a Android s moderním designem a skvělým výkonem.'
  },
  {
    icon: <BrushIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'UI/UX Design',
    description: 'Návrhy uživatelských rozhraní, které nejen vypadají skvěle, ale jsou i intuitivní na používání.'
  },
  {
    icon: <StorageIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Backend vývoj',
    title: 'Backend vývoj',
    description: 'Výkonné backendové systémy a API pro vaše webové a mobilní aplikace.'
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Optimalizace výkonu',
    description: 'Zrychlení a optimalizace stávajících webů a aplikací pro lepší uživatelskou zkušenost.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Bezpečnost',
    description: 'Zabezpečení vašich aplikací a webů proti moderním hrozbám a útokům.'
  }
];

function Services() {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Služby
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Nabízím široké spektrum služeb v oblasti vývoje webových a mobilních aplikací.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard elevation={3}>
                {service.icon}
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    minHeight: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {service.description}
                </Typography>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;
