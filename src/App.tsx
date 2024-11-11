import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './pages/auth';
import Home from './pages/home';
import Movie from './pages/movie';
import Tv from './pages/tv';
import Rated from './pages/rated';
import theme from './theme.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/rated' element={<Rated />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/tv/:id' element={<Tv />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
