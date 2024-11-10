import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from './query';
import { Grid2, Box, Typography } from '@mui/material';

const Movie = () => {
  const { id } = useParams();
  if (!id) return <div>Invalid movie id</div>;
  const { data, isLoading } = useQuery({
    queryKey: ['movie'],
    queryFn: () => getMovieDetails(id),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
      }}>
      <Box
        color='black'
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'>
        <Box>
          <div>
            <img
              height='500px'
              style={{
                backgroundPosition: 'center',
                objectFit: 'cover',
                borderRadius: 5,
              }}
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            />
          </div>
        </Box>
        <Box textAlign='left' flexDirection='column'>
          <Typography variant='h3'>{data.title}</Typography>
          <Box display='flex'>
            {data.genres.map((genre) => (
              <Typography key={genre.name}>{genre.name}</Typography>
            ))}
          </Box>
          <Typography>Overview</Typography>
          <Typography>{data.overview}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Movie;
