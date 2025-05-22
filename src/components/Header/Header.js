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
  Box,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthState, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

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
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ 
              fontWeight: 'bold',
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                cursor: 'pointer',
                opacity: 0.9
              }
            }}
          >
            Skajny Portfolio
          </Typography>
        </Box>
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              color="inherit" 
              component={RouterLink} 
              to="/admin/messages"
              title="Administrace"
            >
              <AdminPanelSettingsIcon />
            </IconButton>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Odhlásit se
            </Button>
          </Box>
        ) : (
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/admin"
            startIcon={<AdminPanelSettingsIcon />}
            sx={{ textTransform: 'none' }}
          >
            Přihlásit se
          </Button>
        )}
        
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
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.text}
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
