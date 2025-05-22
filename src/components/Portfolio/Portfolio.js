import React, { useState, useEffect } from 'react';
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
  DialogActions,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import { getPortfolioItems } from '../../services/portfolioService';

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
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        const items = await getPortfolioItems();
        setPortfolioItems(items);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio items:', err);
        setError('Nepodařilo se načíst portfolio. Zkuste to prosím později.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

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
    : portfolioItems.filter(item => item.category && item.category.toLowerCase() === selectedCategory);

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

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box textAlign="center" py={4}>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Zkusit znovu
            </Button>
          </Box>
        ) : filteredItems.length === 0 ? (
          <Box textAlign="center" py={4} width="100%">
            <Typography variant="h6" color="textSecondary">
              Žádné projekty k zobrazení
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <PortfolioItem elevation={3}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl || 'https://via.placeholder.com/600x400'}
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
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: 'auto', p: 2 }}>
                    {item.githubUrl && (
                      <Button 
                        size="small" 
                        startIcon={<GitHubIcon />}
                        onClick={() => window.open(item.githubUrl, '_blank')}
                      >
                        Kód
                      </Button>
                    )}
                    <Button 
                      size="small" 
                      startIcon={<OpenInNewIcon />}
                      onClick={() => handleOpenDialog(item)}
                      sx={{ ml: 'auto' }}
                    >
                      Více informací
                    </Button>
                  </CardActions>
                </PortfolioItem>
              </Grid>
            ))}
          </Grid>
        )}
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
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {selectedProject.title}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <img 
                  src={selectedProject.imageUrl || 'https://via.placeholder.com/800x450'} 
                  alt={selectedProject.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px',
                    marginBottom: '16px',
                    maxHeight: '400px',
                    objectFit: 'contain'
                  }} 
                />
                <DialogContentText>
                  {selectedProject.description}
                  {selectedProject.fullDescription && (
                    <Box mt={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        Podrobnosti:
                      </Typography>
                      <Typography variant="body2">
                        {selectedProject.fullDescription}
                      </Typography>
                    </Box>
                  )}
                </DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip 
                  label={selectedProject.category || 'web'} 
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                color="primary"
              >
                Zavřít
              </Button>
              {selectedProject.videoUrl && (
                <Button 
                  onClick={() => window.open(selectedProject.videoUrl, '_blank')}
                  variant="contained"
                  color="primary"
                  startIcon={<OpenInNewIcon />}
                  sx={{ ml: 1 }}
                >
                  Zobrazit video
                </Button>
              )}
              {selectedProject.githubUrl && (
                <Button 
                  onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                  variant="contained"
                  color="secondary"
                  startIcon={<GitHubIcon />}
                  sx={{ ml: 1 }}
                >
                  Zobrazit kód
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Portfolio;
