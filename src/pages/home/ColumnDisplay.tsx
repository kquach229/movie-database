import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormGroup,
  Grid,
  Snackbar,
  Typography,
  Box,
  TextField,
  Tooltip,
} from '@mui/material';
import { DisplayType } from '.';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import { rateMovie, rateTv } from './query';
import { ellipsize } from '../../utils/utils';

interface DisplayData {
  id: number;
  overview?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

const ColumnDisplay = ({ data, displayType, isRated = false }: Props) => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  // Assuming RatingResponse looks like this
  interface RatingResponse {
    rating: number;
    message: string;
    // other fields
  }

  const {
    mutate: rateMovieMutation,
    status: rateMovieStatus,
  }: UseMutationResult<number, unknown, { id: number; rating: number }> =
    useMutation({
      mutationKey: ['rateMovie'],
      mutationFn: ({ id, rating }: { id: number; rating: number }) => {
        return rateMovie(id, rating).then(
          (response: RatingResponse) => response.rating // Return only the `rating` value
        );
      },
      onSuccess: (
        rating: number,
        variables: { id: number; rating: number }
      ) => {
        const { id } = variables; // Extract the `id` from the variables

        // Reset and invalidate queries
        queryClient.resetQueries({ queryKey: ['ratings'] });
        queryClient.invalidateQueries({ queryKey: ['ratedMovies'] });
        queryClient.invalidateQueries({ queryKey: ['ratedTv'] });

        setOpen(true);

        // Update ratings state
        setRatings((prevRatings) => ({
          ...prevRatings,
          [id]: rating, // Update the rating for the specific id
        }));
      },
      onError: (error: unknown) => {
        console.error('Error rating movie:', error);
      },
    });

  const {
    mutate: rateTvMutation,
    status: rateTvStatus,
  }: UseMutationResult<number, unknown, { id: number; rating: number }> =
    useMutation({
      mutationKey: ['rateTv'],
      mutationFn: ({ id, rating }: { id: number; rating: number }) => {
        return rateTv(id, rating).then(
          (response: RatingResponse) => response.rating // Return only the `rating` value
        );
      },
      onSuccess: (
        rating: number,
        variables: { id: number; rating: number }
      ) => {
        const { id } = variables; // Extract the `id` from the variables

        // Reset and invalidate queries
        queryClient.resetQueries({ queryKey: ['ratings'] });
        queryClient.invalidateQueries({ queryKey: ['ratedMovies'] });
        queryClient.invalidateQueries({ queryKey: ['ratedTv'] });

        setOpen(true);

        // Update ratings state
        setRatings((prevRatings) => ({
          ...prevRatings,
          [id]: rating, // Update the rating for the specific id
        }));
      },
      onError: (error: unknown) => {
        console.error('Error rating TV:', error);
      },
    });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvMutation;

  const handleSubmit = async (
    e: React.FormEvent,
    id: number,
    rating: number
  ) => {
    e.preventDefault();
    rate({ id, rating });
  };

  const handleRatingChange = (id: number, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: value,
    }));
  };

  const statusType =
    displayType === DisplayType.Movies
      ? rateMovieStatus === 'success'
        ? 'success'
        : 'error'
      : rateTvStatus === 'success'
      ? 'success'
      : 'error';

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      columns={12}
      mb={5}>
      {data.map((item) => {
        const title =
          displayType === DisplayType.Movies ? item.title : item.name;
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/${displayType === DisplayType.Movies ? 'movie' : 'tv'}/${
                item.id
              }`}>
              <Card
                sx={{
                  height: { xs: 'auto', sm: '700px' },
                  width: { xs: '100%', sm: 'auto' },
                  maxWidth: '300px',
                  margin: '0 auto',
                  bgcolor: '#1b1b1d',
                }}
                raised>
                <Box position='relative'>
                  <CardMedia
                    component='img'
                    sx={{
                      height: { xs: '400px', sm: '500px' },
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  />

                  <Typography
                    fontSize='12px'
                    fontWeight='bold'
                    sx={{
                      width: '35px',
                      height: '27px',
                      position: 'absolute',
                      opacity: 0.9,
                      paddingTop: 1,
                      top: 10,
                      right: 10,
                      backgroundColor: '#1b1b1d',
                      borderRadius: '30px',
                    }}
                    color='secondary'>
                    {item.vote_average?.toFixed(1)}
                  </Typography>
                </Box>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography
                    fontWeight='bold'
                    variant='h6'
                    color='#A13333'
                    fontSize={{ xs: '16px', sm: '18px' }}>
                    {title}
                  </Typography>
                  <Box display='flex' alignItems='center'>
                    <Typography fontWeight='bold' fontSize='11px'>
                      {displayType === DisplayType.Movies
                        ? 'Release Date:'
                        : 'First Aired'}
                    </Typography>
                    <Typography ml={1} fontSize='11px'>
                      {displayType === DisplayType.Movies
                        ? item.release_date
                        : item.first_air_date}
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={{ xs: '10px', sm: '12px' }}
                    color='textPrimary'>
                    {ellipsize(item?.overview || '', 125)}
                  </Typography>
                  {isRated && (
                    <Typography
                      fontSize='12px'
                      color='info'
                      textAlign='left'
                      mt={1}>
                      Your Rating: {item.rating}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Link>

            {!isRated && (
              <form
                onSubmit={(e) =>
                  handleSubmit(e, item.id, ratings[item.id] || 0)
                }>
                <FormControl
                  sx={{
                    width: '100%',
                    maxWidth: '300px',
                    display: 'flex',
                    margin: '0 auto',
                  }}>
                  <FormGroup>
                    <Box display='flex' flexDirection='column'>
                      <Box>
                        <FormGroup
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Box
                            textAlign='center'
                            display='flex'
                            flexDirection='column'>
                            <Tooltip
                              placement='right-start'
                              title='Rate this work from 1-10. You will be able to see it on the rated page'>
                              <Typography textAlign='left'>Rating</Typography>
                            </Tooltip>
                          </Box>
                          <TextField
                            InputProps={{
                              inputProps: { min: 1, max: 10 },
                            }}
                            type='number'
                            sx={{ width: '50%', padding: '20px' }}
                            value={ratings[item.id] || 0}
                            onChange={(e) =>
                              handleRatingChange(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                          />
                        </FormGroup>
                      </Box>
                      <Button variant='contained' type='submit' fullWidth>
                        Rate!
                      </Button>
                    </Box>
                  </FormGroup>
                </FormControl>
              </form>
            )}
          </Grid>
        );
      })}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={statusType}
          variant='filled'
          sx={{ width: '100%' }}>
          {statusType === 'success' ? 'Rating Successful' : 'An error occurred'}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ColumnDisplay;
