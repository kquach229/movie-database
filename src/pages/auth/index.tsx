import { Button, FormControl, Grid2, Typography } from '@mui/material';
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
    <Grid2
      maxWidth={450}
      columnSpacing={2}
      justifyContent='center'
      direction='column'
      alignItems='center'
      textAlign='center'>
      <Typography>Welcome! Login by registering as a Guest below</Typography>
      <FormControl>
        <Button onClick={handleLogin}>Login</Button>
      </FormControl>
    </Grid2>
  );
};

export default Auth;
