import { Toolbar, AppBar, Box, Button, Typography } from '@mui/material';
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button>
              <Link to='/'>Home</Link>
            </Button>

            <Button>
              <Link to='/rated'>Rated</Link>
            </Button>
          </Box>

          <Box>
            {isLoggedIn ? (
              <Button color='secondary' onClick={logout}>
                <Typography color='yellow'>Logout</Typography>
              </Button>
            ) : (
              <Button>
                <Link to='/auth'>Auth</Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
