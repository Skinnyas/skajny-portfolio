import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
        padding: theme.spacing(4, 0),
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
              }}
            >
              Ahoj, já jsem Skajny
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
              }}
            >
              Vítejte v mém portfoliu
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Jsem nadšený vývojář se zájmem o moderní webové technologie.
              Specializuji se na tvorbu responzivních a uživatelsky přívětivých webových aplikací.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/portfolio"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                }}
              >
                Moje práce
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component={RouterLink}
                to="/kontakt"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                }}
              >
                Kontaktujte mě
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://media.discordapp.net/attachments/1341489992006111242/1342274574351601744/S.png?ex=682f085c&is=682db6dc&hm=a1e601aaaf0fa44c0fde7d842626cbd5463d509b414569b9be11b66f40aaeac8&=&format=webp&quality=lossless&width=968&height=968"
              alt="Profilový obrázek"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: '100%',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
