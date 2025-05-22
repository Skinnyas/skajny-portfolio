import React, { useState, useEffect } from 'react';
import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../services/portfolioService';
import { getCategories } from '../../services/categoryService';
import { 
  Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Card, CardContent, CardActions, IconButton, CircularProgress, 
  Chip, FormControl, InputLabel, Select, MenuItem, Checkbox
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  VideoLibrary as VideoIcon, 
  Code as CodeIcon
} from '@mui/icons-material';

const PortfolioManager = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    videoUrl: '',
    imageUrl: '',
    technologies: [],
    categoryIds: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [portfolioData, categoriesData] = await Promise.all([
          getPortfolioItems(),
          getCategories()
        ]);
        setItems(portfolioData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  useEffect(() => {
    const loadFilteredItems = async () => {
      try {
        setLoading(true);
        const data = await getPortfolioItems(selectedCategory === 'all' ? null : selectedCategory);
        setItems(data);
      } catch (error) {
        console.error('Error loading filtered items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFilteredItems();
  }, [selectedCategory]);

  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item.id);
      setFormData({
        title: item.title,
        description: item.description,
        githubUrl: item.githubUrl || '',
        videoUrl: item.videoUrl || '',
        imageUrl: item.imageUrl || '',
        technologies: item.technologies || [],
        categoryIds: item.categoryIds || []
      });
    } else {
      setCurrentItem(null);
      setFormData({
        title: '',
        description: '',
        githubUrl: '',
        videoUrl: '',
        imageUrl: '',
        technologies: [],
        categoryIds: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddTechnology = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tech = e.target.value.trim();
      if (tech && !formData.technologies.includes(tech)) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, tech]
        }));
        e.target.value = '';
      }
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      categoryIds: value
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
      setOpenDialog(false);
      // Refresh the items list
      const data = await getPortfolioItems(selectedCategory === 'all' ? null : selectedCategory);
      setItems(data);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deletePortfolioItem(id);
        const data = await getPortfolioItems(selectedCategory === 'all' ? null : selectedCategory);
        setItems(data);
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">Portfolio Manager</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Item
        </Button>
      </Box>

      <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
        <InputLabel id="category-filter-label">Filter by Category</InputLabel>
        <Select
          labelId="category-filter-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Filter by Category"
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  {item.description.length > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description}
                </Typography>
                
                {item.technologies && item.technologies.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Technologies:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {item.technologies.map((tech, index) => (
                        <Chip key={index} label={tech} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {item.githubUrl && (
                    <IconButton
                      size="small"
                      color="primary"
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CodeIcon />
                    </IconButton>
                  )}
                  {item.videoUrl && (
                    <IconButton
                      size="small"
                      color="primary"
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <VideoIcon />
                    </IconButton>
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
          <DialogTitle>{currentItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
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
                  label="Description"
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
                  label="GitHub URL"
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
                  label="Video URL"
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
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Technologies (press Enter or comma to add)
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onKeyDown={handleAddTechnology}
                    placeholder="Enter a technology and press Enter"
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        onDelete={() => handleRemoveTechnology(tech)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="categories-label">Categories</InputLabel>
                  <Select
                    labelId="categories-label"
                    id="categories"
                    multiple
                    value={formData.categoryIds}
                    onChange={handleCategoryChange}
                    inputProps={{ name: 'categoryIds' }}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const category = categories.find(cat => cat.id === value);
                          return category ? (
                            <Chip key={value} label={category.name} size="small" />
                          ) : null;
                        })}
                      </Box>
                    )}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Checkbox checked={formData.categoryIds.includes(category.id)} />
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {currentItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default PortfolioManager;
