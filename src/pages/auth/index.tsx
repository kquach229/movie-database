import { Button, FormControl, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationKey: ['login'],
    mutationFn: mutationLogin,
  });

  const handleLogin = async () => {
    const data = await mutateAsync();
    localStorage.setItem('guest_session_id', data.guest_session_id);
    navigate('/');
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{
        padding: { xs: 2, sm: 3 }, // Responsive padding
        boxShadow: 3,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          opacity: 0.7,
          backgroundColor: 'secondary.main',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          zIndex: -1,
        },
      }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <img
          style={{ objectFit: 'cover' }}
          src={'/filmnation.png'}
          width={'100%'}
          height={'auto'}
          alt='logo'
        />
        <Typography
          fontSize='15px'
          fontWeight='bold'
          mt={5}
          sx={{
            color: 'text.primary',
            marginBottom: 5,
            textAlign: 'center',
          }}>
          Welcome to Filmnation Entertainments! Login below
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <Button
            onClick={handleLogin}
            variant='contained'
            color='secondary'
            sx={{
              padding: '10px 20px',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'none',
              borderRadius: '5px',
              width: '100%', // Make button full-width on smaller screens
            }}>
            Login
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Auth;
