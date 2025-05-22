import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { CircularProgress, Box } from '@mui/material';

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Uložíme původní URL pro přesměrování po přihlášení
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
