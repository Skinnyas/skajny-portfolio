import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DevicesIcon from '@mui/icons-material/Devices';

const SkillCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const skills = [
  {
    icon: <CodeIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Vývoj aplikací',
    description: 'Výkonné a škálovatelné webové aplikace s moderními technologiemi jako React, Node.js a Python.'
  },
  {
    icon: <DesignServicesIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'UI/UX Design',
    description: 'Moderní a uživatelsky přívětivá rozhraní s důrazem na uživatelskou zkušenost a přístupnost.'
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
    title: 'Responzivní design',
    description: 'Weby, které vypadají skvěle na všech zařízeních, od mobilů po stolní počítače.'
  }
];

function About() {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
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
            O mně
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
            Jsem vášnivý vývojář s láskou k čistému kódu a elegantním řešením.
          </Typography>
        </Box>

        <Box mb={8}>
          <Grid container spacing={4}>
            {skills.map((skill, index) => (
              <Grid item xs={12} md={4} key={index}>
                <SkillCard elevation={3}>
                  {skill.icon}
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {skill.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {skill.description}
                  </Typography>
                </SkillCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Můj příběh
          </Typography>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
              Vždy mě zajímalo, jak věci fungují pod pokličkou. Tato zvědavost mě přivedla ke světu programování, kde jsem objevil svou vášeň pro vytváření užitečných a krásných webových aplikací.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
              S více než X lety zkušeností v oboru jsem měl příležitost pracovat na různých projektech, od malých firemních webů po komplexní webové aplikace. Každý projekt je pro mě příležitostí naučit se něco nového a posunout své schopnosti dál.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Když zrovna nepíšu kód, rád se věnuji [vaše zájmy]. Věřím v neustálé vzdělávání a sdílení znalostí s komunitou.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
