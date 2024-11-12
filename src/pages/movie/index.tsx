import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from './query';
import { Box, Typography, Tooltip, Grid } from '@mui/material';
import { formatCurrency, formatMovieTime } from '../../utils/utils';
import { FaInfoCircle } from 'react-icons/fa';
import moment from 'moment';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loader from '../../components/Loader';

// Define interface for movie data
interface MovieData {
  backdrop_path: string;
  revenue: number;
  spoken_languages: { english_name: string }[];
  status: string;
  poster_path: string;
  title: string;
  release_date: string;
  origin_country?: string;
  genres: { name: string }[];
  runtime: number;
  tagline: string;
  overview: string;
  production_companies: { name: string }[];
  belongs_to_collection?: { name: string };
  vote_average: number;
  vote_count: number;
}

const Movie = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  if (!id) return <div>Invalid movie id</div>;
  const matches = useMediaQuery('(min-width:600px)');

  const { data, isLoading } = useQuery<MovieData>({
    queryKey: ['movie', id], // Include id in query key
    queryFn: () => getMovieDetails(id),
  });

  if (isLoading) return <Loader />;
  if (!data) return <div>No data available</div>; // Handle possible null data

  // Type the parameter for extraProductionContent
  const extraProductionContent = (data: MovieData) => {
    return (
      <Box
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
            zIndex: -1, // Ensures it stays behind the content
          },
        }}
        borderRadius={3}
        gap={7}
        p={3}>
        <Typography fontWeight={900} textAlign='center'>
          Additional Info
        </Typography>
        <Typography variant='subtitle1' fontWeight={700}>
          Revenue:{' '}
        </Typography>
        <Typography>{formatCurrency(data.revenue, 'US')}</Typography>

        <Box>
          <Typography variant='subtitle1' fontWeight={700}>
            Spoken Languages:
          </Typography>

          <Typography>
            {data.spoken_languages.map((lang) => lang.english_name).join(', ')}
          </Typography>
        </Box>
        <Box>
          <Typography variant='subtitle1' fontWeight={700}>
            Production Status:
          </Typography>
          <Typography>{data.status}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          zIndex: -1,
        },
      }}>
      <Tooltip
        sx={{
          backgroundColor: 'transparent !important',
          '.MuiTooltip-tooltip': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        leaveDelay={500}
        title={extraProductionContent(data)}
        placement='bottom-start'>
        <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10000 }}>
          <FaInfoCircle color='#A13333' />
        </Box>
      </Tooltip>
      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} p={3}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: { xs: 0, md: 3 },
          }}>
          <img
            style={{
              height: matches ? '700px' : 'auto',
              width: matches ? 'auto' : '100%',
              maxWidth: matches ? '700px' : '500px',
              objectFit: 'cover',
              borderRadius: 5,
            }}
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            alt={`${data.title} poster`}
          />
        </Box>
        <Grid
          sx={{
            '&::before': {
              content: "''",
              opacity: 0.7,
              backgroundColor: '#2e2e2e',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1,
            },
          }}
          gap={2}
          mt={2}
          padding={{ xs: 0, md: 4 }}
          display='flex'
          textAlign='left'
          flexDirection='column'>
          <Typography
            display='flex'
            gap={1}
            alignItems='center'
            variant='h4'
            fontWeight='bold'
            color='text.primary'>
            {data.title}
            <Typography color='text.primary'>{`(${
              data.release_date.split('-')[0]
            })`}</Typography>
          </Typography>
          <Grid display='flex' flexDirection='column' gap={1}>
            <Typography color='text.primary'>
              {moment(data.release_date).format('MM/DD/YYYY')}{' '}
              {`(${data.origin_country || 'N/A'})`}
            </Typography>
            <Typography color='text.primary'>
              {data.genres.map((genre) => genre.name).join(', ')}
            </Typography>
            <Typography mt={3} color='text.primary'>
              <strong>Runtime:</strong>
              <Typography>{formatMovieTime(data.runtime)}</Typography>
            </Typography>
          </Grid>

          <Typography
            color='secondary.main'
            fontStyle='italic'
            fontWeight={600}>
            {data.tagline}
          </Typography>
          <Typography color='text.primary' fontWeight={700}>
            Overview
          </Typography>
          <Typography color='text.primary'>{data.overview}</Typography>
          <Box display='flex' flexDirection='column' gap={1}>
            <Box display='flex' flexDirection='column' mb={2} gap={1}>
              <Typography color='text.primary' fontWeight='bold'>
                Production Companies:
              </Typography>
              <Typography color='text.primary'>
                {data.production_companies.map((comp) => comp.name).join(', ')}
              </Typography>
            </Box>
            {data.belongs_to_collection && (
              <Box display='flex' flexDirection='column' mb={2} gap={1}>
                <Typography color='text.primary' fontWeight='bold'>
                  Collection:
                </Typography>
                <Typography color='text.primary'>
                  {data.belongs_to_collection.name}
                </Typography>
              </Box>
            )}

            <Box display='flex' gap={1}>
              <Typography color='text.primary' fontWeight='bold'>
                Vote Average:
              </Typography>
              <Typography color='text.primary'>{data.vote_average}</Typography>
            </Box>
            <Typography color='text.secondary' fontSize='12px'>
              Based on {data.vote_count} ratings
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Movie;
