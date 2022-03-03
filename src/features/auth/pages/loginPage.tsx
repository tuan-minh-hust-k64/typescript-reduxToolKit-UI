import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IUser } from 'model';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { actionAuth, selectIsLoggedIn, selectLogging } from '../authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState<IUser>({
    email: '',
    password: '',
  });
  const authSeletor = useAppSelector(selectIsLoggedIn);
  const isLogging = useAppSelector(selectLogging);
  const handleLogin = () => {
    dispatch(actionAuth.login(formData));
  };
  const isAuthenticated = authSeletor ;
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          width: 500,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="h1">
          Student Manager
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <div>
            <TextField
              id="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              fullWidth
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>
          <Button variant="contained" fullWidth color="primary" onClick={handleLogin}>Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
