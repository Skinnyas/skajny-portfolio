import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { AdminPanelSettings, Logout, Work, Message, Category } from '@mui/icons-material';
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const FloatingButton = styled('div')(({ theme, isvisible, isloggedin }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
  opacity: isvisible === 'true' ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    opacity: 1,
  },
  '& .MuiIconButton-root': {
    backgroundColor: isloggedin === 'true' ? 'rgba(220, 0, 78, 0.9)' : 'rgba(25, 118, 210, 0.9)',
    color: 'white',
    '&:hover': {
      backgroundColor: isloggedin === 'true' ? 'rgba(197, 17, 98, 1)' : 'rgba(21, 101, 192, 1)',
    },
  },
}));

function FloatingAdmin() {
  const [isVisible, setIsVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        setIsVisible(true);
        
        // Hide after 3 seconds if not hovered
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setAnchorEl(null);
  }; 
  
  const handleAdminClick = () => {
    if (!user) {
      navigate('/admin');
    } else {
      setAnchorEl(null);
      // Show menu for logged-in users
      const event = {
        currentTarget: document.querySelector('#admin-button')
      };
      if (event.currentTarget) {
        handleMenuOpen(event);
      }
    }
  };

  const handleLogout = async (e) => {
    e.stopPropagation();
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <FloatingButton 
        isvisible={isVisible.toString()} 
        isloggedin={(!!user).toString()}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Tooltip title={user ? 'Administrace' : 'Přihlásit se'}>
          <IconButton 
            id="admin-button"
            onClick={handleAdminClick} 
            size="large"
            aria-controls={open ? 'admin-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AdminPanelSettings />
          </IconButton>
        </Tooltip>
        {user && (
          <Tooltip title="Odhlásit se">
            <IconButton 
              onClick={handleLogout} 
              size="large" 
              sx={{ 
                marginLeft: '8px',
                backgroundColor: 'rgba(220, 0, 78, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(197, 17, 98, 1)',
                },
              }}
            >
              <Logout />
            </IconButton>
          </Tooltip>
        )}
      </FloatingButton>

      <Menu
        id="admin-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'admin-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleNavigation('/admin/zpravy')}>
          <ListItemIcon>
            <Message fontSize="small" />
          </ListItemIcon>
          <ListItemText>Zprávy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/admin/portfolio')}>
          <ListItemIcon>
            <Work fontSize="small" />
          </ListItemIcon>
          <ListItemText>Portfolio</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/admin/kategorie')}>
          <ListItemIcon>
            <Category fontSize="small" />
          </ListItemIcon>
          <ListItemText>Kategorie</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default FloatingAdmin;
