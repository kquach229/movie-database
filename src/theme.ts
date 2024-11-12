// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Mono',
    fontSize: 14,
  },
  palette: {
    mode: 'light', // Ensures dark mode background settings
    background: {
      default: '#1b1b1d', // Charcoal Black for the main background
      paper: '#2e2e2e', // Deep Gray for cards or paper components
    },
    primary: {
      main: '#373F51', // Slate Blue for primary accents
    },
    secondary: {
      main: '#A13333', // Rusty Red for buttons or icons
    },
    text: {
      primary: '#d3d3d3', // Light Silver for main text
      secondary: '#a1a1a1', // Cool Gray for secondary text
    },
  },
});

export default theme;
