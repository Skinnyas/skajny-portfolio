import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  useTheme,
  Tabs,
  Tab,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';

// Sample portfolio items - replace with your actual projects
const portfolioItems = [
  {
    id: 1,
    title: 'E-commerce Web',
    description: 'Kompletní e-commerce řešení s platební branou a správou zboží.',
    image: 'https://via.placeholder.com/600x400',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
    fullDescription: 'Tento projekt představuje kompletní e-commerce řešení postavené na MERN stacku (MongoDB, Express, React, Node.js). Obsahuje správu produktů, uživatelský účet, košík, platební bránu Stripe a administrační rozhraní.'
  },
  {
    id: 2,
    title: 'Mobilní aplikace',
    description: 'Aplikace pro správu osobních financí s přehledným rozhraním.',
    image: 'https://via.placeholder.com/600x400',
    tags: ['React Native', 'Firebase', 'Redux'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'mobile',
    fullDescription: 'Aplikace pro správu osobních financí umožňující uživatelům sledovat své příjmy a výdaje, nastavovat rozpočty a generovat přehledy. Aplikace je postavena na React Native a využívá Firebase pro ukládání dat a autentizaci uživatelů.'
  },
  {
    id: 3,
    title: 'Firemní web',
    description: 'Moderní firemní web s administrací obsahu.',
    image: 'https://via.placeholder.com/600x400',
    tags: ['Next.js', 'Contentful', 'Tailwind CSS'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
    fullDescription: 'Responzivní firemní web postavený na Next.js s headless CMS Contentful pro správu obsahu. Web obsahuje blog, referenční případy a kontaktní formulář.'
  },
  {
    id: 4,
    title: 'Aplikace pro správu úkolů',
    description: 'Aplikace pro správu projektů a úkolů s týmovou spoluprací.',
    image: 'https://via.placeholder.com/600x400',
    tags: ['React', 'Node.js', 'GraphQL', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
    fullDescription: 'Komplexní aplikace pro správu projektů s funkcí přidělování úkolů, sledování průběhu, komentářů a notifikací. Postaveno na MERN stacku s GraphQL API.'
  },
  {
    id: 5,
    title: 'Předpověď počasí',
    description: 'Aplikace pro zobrazení aktuální předpovědi počasí.',
    image: 'https://via.placeholder.com/600x400',
    tags: ['React', 'OpenWeather API', 'Material-UI'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'mobile',
    fullDescription: 'Uživatelsky přívětivá aplikace pro zobrazení aktuální předpovědi počasí a pětidenní předpovědi. Aplikace využívá OpenWeather API a umožňuje vyhledávání podle města.'
  },
  {
    id: 6,
    title: 'Portfolio web',
    description: 'Osobní portfolio web pro grafického designéra.',
    image: 'https://via.placeholder.com/600x400',
    tags: ['Gatsby', 'GraphQL', 'Styled Components'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
    fullDescription: 'Moderní a výkonné portfolio postavené na Gatsby.js s využitím GraphQL pro správu dat. Web je optimalizovaný pro vyhledávače a nabízí plynulé animace.'
  },
];

const categories = [
  { id: 'all', label: 'Vše' },
  { id: 'web', label: 'Webové stránky' },
  { id: 'mobile', label: 'Mobilní aplikace' },
];

const PortfolioItem = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

function Portfolio() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

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
            Moje práce
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Prohlédněte si některé z mých nedávných projektů
          </Typography>
          
          <Paper 
            elevation={0} 
            sx={{
              display: 'inline-flex',
              borderRadius: 2,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
              mb: 4,
            }}
          >
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {categories.map((category) => (
                <Tab 
                  key={category.id} 
                  value={category.id} 
                  label={category.label} 
                  sx={{ px: 4, py: 1.5 }}
                />
              ))}
            </Tabs>
          </Paper>
        </Box>

        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <PortfolioItem elevation={3}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    objectFit: 'cover',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                  onClick={() => handleOpenDialog(item)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {item.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    startIcon={<OpenInNewIcon />}
                    onClick={() => window.open(item.demoUrl, '_blank')}
                    disabled={!item.demoUrl}
                  >
                    Živá ukázka
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<GitHubIcon />}
                    onClick={() => window.open(item.codeUrl, '_blank')}
                    disabled={!item.codeUrl}
                  >
                    Kód
                  </Button>
                </CardActions>
              </PortfolioItem>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Project Details Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {selectedProject.title}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }} 
                />
                <DialogContentText>
                  {selectedProject.fullDescription}
                </DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedProject.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                color="primary"
              >
                Zavřít
              </Button>
              <Button 
                onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                variant="contained"
                color="primary"
                disabled={!selectedProject.demoUrl}
                startIcon={<OpenInNewIcon />}
              >
                Navštívit web
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Portfolio;
