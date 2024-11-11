import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  Snackbar,
  SnackbarCloseReason,
  Typography,
  Box,
  TextField,
  Badge,
} from '@mui/material';
import { DisplayType } from '.';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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

  const onSuccess = () => {
    setToastMessage('Rating successfully');
    setOpen(true);
  };

  const onError = () => {
    setToastMessage('Rating error');
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const { mutate: rateMovieMutation, status: rateMovieStatus } = useMutation({
    mutationKey: ['rateMovie'],
    mutationFn: (id: number) => rateMovie(id, ratings[id]),
    onSuccess,
    onError,
  });

  const { mutate: rateTvMutation, status: rateTvStatus } = useMutation({
    mutationKey: ['rateTv'],
    mutationFn: (id: number) => rateTv(id, ratings[id]),
    onSuccess,
    onError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvMutation;

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    rate(id);
  };

  const handleRatingChange = (id: number, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: value,
    }));
  };

  const statusType =
    displayType === DisplayType.Movies ? rateMovieStatus : rateTvStatus;
  console.log('kldsfjlksjflksjfklsj', data);
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
                  height: { xs: 'auto', sm: '700px' }, // Responsive height
                  width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto on larger screens
                  maxWidth: '300px',
                  margin: '0 auto', // Center the card horizontally
                }}
                raised>
                <Box position='relative'>
                  <CardMedia
                    component='img'
                    sx={{
                      height: { xs: '400px', sm: '500px' }, // Adjust height for smaller screens
                      width: '100%', // Take full width of card
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
                      Release Date:
                    </Typography>
                    <Typography ml={1} fontSize='11px'>
                      {item.release_date}
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
            {isRated && <Typography>Your Rating: {item.rating}</Typography>}
            <form onSubmit={(e) => handleSubmit(e, item.id)}>
              <FormControl
                sx={{
                  width: '100%', // Full width on mobile
                  maxWidth: '300px', // Restrict max width on larger screens
                  display: 'flex',
                  margin: '0 auto', // Center the form on smaller screens
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
                        <Typography>Rating</Typography>
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
