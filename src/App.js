import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { AdminLogin, MessagesList, PortfolioManager, PrivateRoute } from './components/Admin';
import FloatingAdmin from './components/FloatingAdmin/FloatingAdmin';
import CustomCursor from './components/CustomCursor/CustomCursor';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            cursor: 'none !important',
          },
          'a, button, [role="button"], [onclick]': {
            cursor: 'none !important',
          },
        }}
      />
      <CustomCursor />
      <Header />
      <FloatingAdmin />
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-mne" element={<About />} />
          <Route path="/sluzby" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/zpravy" 
            element={
              <PrivateRoute user={user}>
                <MessagesList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/portfolio" 
            element={
              <PrivateRoute user={user}>
                <PortfolioManager />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
