import { Toolbar, AppBar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Button>
            <Link to='/'>Home</Link>
          </Button>
          <Button>
            <Link to='/auth'>Auth</Link>
          </Button>
          <Button>
            <Link to='/rated'>Rated</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
