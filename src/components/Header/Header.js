import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import '@fontsource/bebas-neue';

const navItems = [
  { text: 'Domů', path: '/' },
  { text: 'O mně', path: '/o-mne' },
  { text: 'Služby', path: '/sluzby' },
  { text: 'Portfolio', path: '/portfolio' },
  { text: 'Kontakt', path: '/kontakt' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Skajny Portfolio
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.2rem',
                letterSpacing: '1px'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              height: '50px',
              width: '50px',
              padding: '5px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                cursor: 'pointer',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.1)',
                  filter: 'blur(8px)',
                  zIndex: -1,
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(0.9) translateY(5px)'
                },
                '& img': {
                  transform: 'scale(1.1)',
                  filter: 'brightness(1.2) saturate(1.2) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
                }
              }
            }}
          >
            <img 
              src="/logo192.png" 
              alt="Logo" 
              style={{ 
                height: '100%',
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 0.3s ease-in-out',
                filter: 'brightness(1) saturate(1)'
              }}
            />
          </Box>
        </Box>
        
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{ 
                  color: 'white',
                  mx: 1,
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '1px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.text.toUpperCase()}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
      
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
