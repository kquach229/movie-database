import { Button } from '@mui/material';
import { useState } from 'react';
import ColumnDisplay from './ColumnDisplay';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchTvShows } from './query';
import { Navigate } from 'react-router-dom';

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
      {isLoadingMovies || isLoadingTv ? (
        'Loading...'
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={movieData.results}
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvData.results}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
