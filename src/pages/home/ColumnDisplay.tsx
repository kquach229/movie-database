import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormGroup,
  Grid,
  Input,
  Snackbar,
  SnackbarCloseReason,
  Typography,
  Box,
  TextField,
  Tooltip,
} from '@mui/material';
import { DisplayType } from '.';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateMovie, rateTv } from './query';
import { ellipsize } from '../../utils/utils.js';

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

const ColumnDisplay = ({ data, displayType, isRated }: Props) => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = async (id: number) => {
    setToastMessage('Rating successful');
    setOpen(true);
    await queryClient.invalidateQueries({ queryKey: ['ratedTv'] });
    await queryClient.invalidateQueries({ queryKey: ['ratedMovies'] });
    await queryClient.resetQueries({ queryKey: ['ratings'] });
  };

  const onError = () => {
    setToastMessage('Rating error');
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    setOpen(false);
  };

  const { mutate: rateMovieMutation, status: rateMovieStatus } = useMutation({
    mutationKey: ['rateMovie'],
    mutationFn: ({ id, rating }: { id: number; rating: number }) =>
      rateMovie(id, rating),
    onSuccess,
    onError,
  });

  const { mutate: rateTvMutation, status: rateTvStatus } = useMutation({
    mutationKey: ['rateTv'],
    mutationFn: ({ id, rating }: { id: number; rating: number }) =>
      rateTv(id, rating),
    onSuccess,
    onError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvMutation;

  const handleSubmit = (e: React.FormEvent, id: number, rating: number) => {
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
    displayType === DisplayType.Movies ? rateMovieStatus : rateTvStatus;

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      columns={12}>
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
                    {item.vote_average.toFixed(1)}
                  </Typography>
                </Box>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography
                    fontWeight='bold'
                    variant='h6'
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
                    {ellipsize(item.overview)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            <form onSubmit={(e) => handleSubmit(e, item.id, ratings[item.id])}>
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
                          {isRated && (
                            <Typography
                              fontSize='10px'
                              color='info'
                              textAlign='left'
                              mt={0}>
                              Your Rating: {item.rating}
                            </Typography>
                          )}
                        </Box>
                        <TextField
                          InputProps={{
                            inputProps: { min: 1, max: 10 },
                          }}
                          type='number'
                          sx={{ width: '50%', padding: '20px' }}
                          value={ratings[item.id] || 0}
                          onChange={(e) =>
                            handleRatingChange(item.id, Number(e.target.value))
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
