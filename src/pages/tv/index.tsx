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
  Tooltip,
} from '@mui/material';
import { RiArrowDownWideFill } from 'react-icons/ri';
import moment from 'moment';
import { FaInfoCircle } from 'react-icons/fa';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loader from '../../components/Loader';

interface ITvPopoverProps {
  first_air_date: string;
  last_air_date: string;
  spoken_languages: { english_name: string }[];
  status: string;
  backdrop_path: string;
}

interface ITvDetails {
  backdrop_path: string;
  poster_path: string;
  name: string;
  genres: { name: string }[];
  overview: string;
  tagline: string;
  production_companies: { name: string }[];
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string;
  spoken_languages: { english_name: string }[];
  status: string;
  seasons: {
    id: number;
    name: string;
    episode_count: number;
    air_date: string;
  }[];
}

const Tv = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { id } = useParams();
  const matches = useMediaQuery('(min-width:600px)');
  if (!id) return <div>Invalid tv id</div>;

  const { data, isLoading } = useQuery<ITvDetails>({
    queryKey: ['tv', id],
    queryFn: () => getTvDetails(id),
  });

  const handleExpansion =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const extraProductionContent = (info: ITvPopoverProps) => (
    <Box
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          zIndex: -1,
        },
      }}
      borderRadius={3}
      gap={7}
      p={3}>
      <Typography fontWeight={900} textAlign='center'>
        Additional Info
      </Typography>
      <Typography variant='subtitle1' fontWeight={700}>
        First Air Date:
      </Typography>
      <Typography>
        {moment(info.first_air_date).format('MM/DD/YYYY')}
      </Typography>

      <Typography variant='subtitle1' fontWeight={700}>
        Last Air Date:
      </Typography>
      <Typography>{moment(info.last_air_date).format('MM/DD/YYYY')}</Typography>

      <Box>
        <Typography variant='subtitle1' fontWeight={700}>
          Spoken Languages:
        </Typography>
        <Typography>
          {info.spoken_languages.map((lang) => lang.english_name).join(', ')}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle1' fontWeight={700}>
          Production Status:
        </Typography>
        <Typography>{info.status}</Typography>
      </Box>
    </Box>
  );

  if (isLoading) return <Loader />;
  if (!data) return <div>Error loading data</div>;

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Tooltip title={extraProductionContent(data)}>
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
            alt={`${data.name} poster`}
          />
        </Box>

        <Box textAlign='left' flexDirection='column' p={4} color='text.primary'>
          <Typography variant='h3' fontWeight='bold' gutterBottom>
            {data.name}
          </Typography>
          <Typography variant='subtitle1'>
            {data.genres.map((genre) => genre.name).join(', ')}
          </Typography>

          {data.overview && (
            <>
              <Typography variant='h6' fontWeight={700} mb={1}>
                Overview
              </Typography>
              <Typography mb={3}>{data.overview}</Typography>
            </>
          )}

          {data.tagline && (
            <Typography
              mb={3}
              color='secondary.main'
              fontStyle='italic'
              fontWeight={600}>
              {data.tagline}
            </Typography>
          )}

          {data.production_companies.length > 0 && (
            <Box mb={2}>
              <Typography fontWeight='bold'>Production Companies:</Typography>
              <Typography>
                {data.production_companies.map((comp) => comp.name).join(', ')}
              </Typography>
            </Box>
          )}

          <Box mb={3}>
            <Typography fontWeight='bold'>Vote Average:</Typography>
            <Typography>
              {data.vote_average} (based on {data.vote_count} ratings)
            </Typography>
          </Box>

          <Typography variant='h6' fontWeight={700} mb={2}>
            Seasons
          </Typography>
          <Box sx={{ maxHeight: '300px', overflowY: 'scroll' }}>
            {data.seasons.map((season, index) => (
              <Accordion
                key={season.id}
                expanded={expanded === `panel${index}`}
                onChange={handleExpansion(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<RiArrowDownWideFill color='#d3d3d3' />}>
                  <Typography variant='subtitle1'>{season.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography>Episodes: {season.episode_count}</Typography>
                    <Typography>
                      Air Date: {moment(season.air_date).format('MM/DD/YYYY')}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Tv;
