import React, { useState } from 'react';
import { sendMessage } from '../../services/messageService';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  useTheme,
  Snackbar,
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const ContactForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const ContactInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
  '& svg': {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0.5),
  },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: 'auto',
  '& > *': {
    marginRight: theme.spacing(2),
  },
}));

function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Odeslání zprávy do Firebase
    const result = await sendMessage(formData);
    
    if (result.success) {
      // Zobrazení úspěšné zprávy
      setSnackbarMessage('Zpráva byla úspěšně odeslána!');
      setSnackbarSeverity('success');
      
      // Reset formuláře
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      // Zobrazení chybové zprávy
      setSnackbarMessage('Nepodařilo se odeslat zprávu. Zkuste to prosím později.');
      setSnackbarSeverity('error');
    }
    
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
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
            Kontaktujte mě
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
            Máte otázky nebo vás zajímá spolupráce? Neváhejte mě kontaktovat.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <ContactInfo elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Kontaktní informace
              </Typography>
              
              <ContactItem>
                <EmailIcon />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Email</Typography>
                  <Typography variant="body1" color="textSecondary">info@skajny.cz</Typography>
                </Box>
              </ContactItem>
              
              <ContactItem>
                <PhoneIcon />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Telefon</Typography>
                  <Typography variant="body1" color="textSecondary">+420 123 456 789</Typography>
                </Box>
              </ContactItem>
              
              <ContactItem>
                <LocationOnIcon />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Adresa</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Ulice 123<br />
                    Praha, 110 00<br />
                    Česká republika
                  </Typography>
                </Box>
              </ContactItem>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Sledujte mě</Typography>
                <SocialIcons>
                  <IconButton 
                    aria-label="GitHub" 
                    href="https://github.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="LinkedIn" 
                    href="https://linkedin.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="Twitter" 
                    href="https://twitter.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    <TwitterIcon />
                  </IconButton>
                </SocialIcons>
              </Box>
            </ContactInfo>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ContactForm onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Jméno a příjmení"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="subject"
                    name="subject"
                    label="Předmět"
                    value={formData.subject}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="message"
                    name="message"
                    label="Zpráva"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                    }}
                  >
                    Odeslat zprávu
                  </Button>
                </Grid>
              </Grid>
            </ContactForm>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Contact;
