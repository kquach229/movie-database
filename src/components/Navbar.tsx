import { Toolbar, AppBar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const isLoggedIn = localStorage.getItem('guest_session_id') !== null;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('guest_session_id');
    navigate('/auth');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar
          sx={{
            backgroundImage: 'linear-gradient(to right, #A13333, #1b1b1d);',

            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Box display='flex' gap={2}>
            <Link
              style={{
                textDecoration: 'none',
                color: '#d3d3d3',
                fontWeight: 'bold',
              }}
              to='/'>
              Home
            </Link>

            <Link
              style={{
                textDecoration: 'none',
                color: '#d3d3d3',
                fontWeight: 'bold',
              }}
              to='/rated'>
              Rated
            </Link>
          </Box>

          <Box>
            {isLoggedIn ? (
              <Typography
                fontWeight='bold'
                onClick={logout}
                color='text.primary'>
                Logout
              </Typography>
            ) : (
              <Link
                to='/auth'
                style={{
                  textDecoration: 'none',
                  color: '#A13333',
                  fontWeight: 'bold',
                }}>
                Auth
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
