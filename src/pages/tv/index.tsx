import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTvDetails } from './query';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const Tv = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const { id } = useParams();
  if (!id) return <div>Invalid tv id</div>;
  const { data, isLoading } = useQuery({
    queryKey: ['tv', id],
    queryFn: () => getTvDetails(id),
  });

  const handleExpansion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
          <img
            height='500px'
            style={{
              backgroundPosition: 'center',
              objectFit: 'cover',
              borderRadius: 5,
            }}
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            alt='TV show poster'
          />
        </Box>
        <Box textAlign='left' flexDirection='column'>
          <Typography variant='h3'>{data.name}</Typography>
          <Box display='flex'>
            {data.genres.map((genre) => (
              <Typography key={genre.name}>{genre.name}</Typography>
            ))}
          </Box>
          <Typography>Overview</Typography>
          <Typography>{data.overview}</Typography>
        </Box>
        <Box>
          <Typography>Seasons</Typography>
          {data.seasons.map((season, index) => (
            <Accordion
              key={season.id}
              expanded={expanded === `panel${index}`}
              onChange={handleExpansion(`panel${index}`)}>
              <AccordionSummary
                id={`panel${index}-header`}
                expandIcon={<div>Expand</div>}
                aria-controls={`panel${index}-content`}>
                <Typography>Season {season.season_number}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Episodes: {season.episode_count}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Tv;
