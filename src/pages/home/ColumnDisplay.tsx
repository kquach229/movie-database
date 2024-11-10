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
} from '@mui/material';
import { DisplayType } from '.';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { rateMovie, rateTv } from './query';

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
}

const ColumnDisplay = ({ data, displayType }: Props) => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
              to={`/${displayType === DisplayType.Movies ? 'movie' : 'tv'}/${
                item.id
              }`}>
              <Card sx={{ flex: 1 }} raised>
                <CardMedia
                  component='img'
                  image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                />
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant='h5'>{title}</Typography>
                  <Typography>
                    Release Date: {item.release_date} | Rating:{' '}
                    {item.vote_average}
                  </Typography>
                  <Typography color='grey' variant='body1'>
                    {item.overview}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            <form onSubmit={(e) => handleSubmit(e, item.id)}>
              <FormControl>
                <FormGroup>
                  <FormLabel>Rating</FormLabel>
                  <Input
                    type='number'
                    value={ratings[item.id] || 0}
                    onChange={(e) =>
                      handleRatingChange(item.id, Number(e.target.value))
                    }
                  />
                  <Button type='submit'>Rate!</Button>
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
          {statusType === 'success'
            ? 'Rating Successful'
            : 'An error occrurred'}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ColumnDisplay;
