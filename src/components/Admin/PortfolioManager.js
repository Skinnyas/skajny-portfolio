import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../services/portfolioService';
import {
  Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Card, CardContent, CardActions, IconButton, Tooltip, Divider, CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, VideoLibrary as VideoIcon, Code as CodeIcon } from '@mui/icons-material';

const PortfolioManager = () => {
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    videoUrl: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioItems();
      setItems(data);
    } catch (error) {
      console.error('Error loading portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item.id);
      setFormData({
        title: item.title,
        description: item.description,
        githubUrl: item.githubUrl || '',
        videoUrl: item.videoUrl || '',
        imageUrl: item.imageUrl || ''
      });
    } else {
      setCurrentItem(null);
      setFormData({
        title: '',
        description: '',
        githubUrl: '',
        videoUrl: '',
        imageUrl: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await updatePortfolioItem(currentItem, formData);
      } else {
        await addPortfolioItem(formData);
      }
      loadItems();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Opravdu chcete smazat tuto práci z portfolia?')) {
      try {
        await deletePortfolioItem(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Správa portfolia
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Přidat práci
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.imageUrl && (
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                  {item.githubUrl && (
                    <Tooltip title="GitHub">
                      <IconButton 
                        href={item.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <CodeIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {item.videoUrl && (
                    <Tooltip title="Video ukázka">
                      <IconButton 
                        href={item.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <VideoIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton 
                  size="small" 
                  color="primary" 
                  onClick={() => handleOpenDialog(item)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{currentItem ? 'Upravit práci' : 'Přidat novou práci'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Název práce"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Popis"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Odkaz na GitHub"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repository"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Odkaz na video"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/watch?v=..."
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Odkaz na obrázek"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Zrušit</Button>
            <Button type="submit" variant="contained" color="primary">
              {currentItem ? 'Uložit změny' : 'Přidat práci'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default PortfolioManager;
