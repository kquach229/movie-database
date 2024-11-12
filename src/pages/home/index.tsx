import { Tabs, Tab, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import ColumnDisplay from './ColumnDisplay';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchTvShows } from './query';
import { Navigate } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import Loader from '../../components/Loader';
export enum DisplayType {
  Movies = 'movies',
  TvShows = 'tvshows',
}

const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const { data: tvData, isLoading: isLoadingTv } = useQuery({
    queryKey: ['tvshows'],
    queryFn: fetchTvShows,
  });

  if (localStorage.getItem('guest_session_id') === null) {
    return <Navigate to={'/auth'} />;
  }

  return (
    <div style={{ marginTop: 50, height: 'auto' }}>
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
          icon={<PiTelevisionSimpleFill size={22} />}
        />
      </Tabs>
      <Divider sx={{ mt: 2 }} color='#A13333' />

      {isLoadingMovies || isLoadingTv ? (
        <Loader />
      ) : (
        <div style={{ marginTop: 50 }}>
          <Typography variant='h5' mt={3} mb={3}>
            Popular {displayType === DisplayType.Movies ? 'Movies' : 'TV Shows'}
          </Typography>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={movieData?.results || []}
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvData?.results || []}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
