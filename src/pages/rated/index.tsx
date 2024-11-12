import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import Grid from '@mui/material/Grid'; // Importing correct Grid from MUI
import { useState } from 'react';
import { DisplayType } from '../home';
import { useQuery } from '@tanstack/react-query';
import { getRatedMovies, getRatedTv } from './query';
import ColumnDisplay from '../home/ColumnDisplay';
import { Navigate } from 'react-router-dom';
import { PiTelevisionSimple } from 'react-icons/pi';
import { MdLocalMovies } from 'react-icons/md';

const Rated = () => {
  const [displayType, setDisplayType] = useState(DisplayType.Movies);

  const { data: ratedMovies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['ratedMovies'],
    queryFn: getRatedMovies,
  });

  const { data: ratedTv, isLoading: isLoadingTv } = useQuery({
    queryKey: ['ratedTv'],
    queryFn: getRatedTv,
  });

  if (localStorage.getItem('guest_session_id') === null) {
    return <Navigate to={'/auth'} />;
  }

  if (isLoadingMovies || isLoadingTv) return <div>Loading...</div>;

  return (
    <Grid container direction='column' mt={5}>
      <Tabs
        indicatorColor='secondary'
        textColor='secondary'
        sx={{ width: '100%' }}
        value={displayType}>
        <Tab
          onClick={() => setDisplayType(DisplayType.Movies)}
          iconPosition='top'
          label='Movies'
          value={DisplayType.Movies}
          icon={<MdLocalMovies size={22} />}
        />
        <Tab
          onClick={() => setDisplayType(DisplayType.TvShows)}
          iconPosition='top'
          label='Shows'
          value={DisplayType.TvShows}
          icon={<PiTelevisionSimple size={22} />}
        />
      </Tabs>
      <Divider sx={{ mt: 2 }} color='#A13333' />
      <Box textAlign='center' mb={2} mt={5}>
        <Typography variant='h5' mt={3} mb={3}>
          Your Rated{' '}
          {displayType === DisplayType.Movies ? 'Movies' : 'Tv Shows'}
        </Typography>
      </Box>
      <Box>
        <ColumnDisplay
          data={
            displayType === DisplayType.Movies
              ? ratedMovies.results || [] // Fallback to empty array
              : ratedTv.results || [] // Fallback to empty array
          }
          displayType={displayType}
          isRated
        />
      </Box>
    </Grid>
  );
};

export default Rated;
