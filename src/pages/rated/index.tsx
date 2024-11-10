import { Button, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'; // Importing correct Grid from MUI
import { useState } from 'react';
import { DisplayType } from '../home';
import { useQuery } from '@tanstack/react-query';
import { getRatedMovies, getRatedTv } from './query';
import ColumnDisplay from '../home/ColumnDisplay';

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

  if (isLoadingMovies || isLoadingTv) return <div>Loading...</div>;

  return (
    <Grid container direction='column'>
      <Box display='flex' justifyContent='center' mb={2}>
        <Button
          color={displayType === DisplayType.Movies ? 'success' : 'info'}
          onClick={() => setDisplayType(DisplayType.Movies)}>
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? 'success' : 'info'}
          onClick={() => setDisplayType(DisplayType.TvShows)}>
          Tv Shows
        </Button>
      </Box>
      <Box textAlign='center' mb={2}>
        <Typography variant='h5'>
          Rated {displayType === DisplayType.Movies ? 'Movies' : 'Tv Shows'}
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
        />
      </Box>
    </Grid>
  );
};

export default Rated;
