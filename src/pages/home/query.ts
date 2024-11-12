export const fetchMovies = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    {
      headers: {
        Authorization: `${import.meta.env.VITE_API_KEY_BEAR}`,
      },
    }
  );

  const data = await res.json();

  return data;
};

export const fetchTvShows = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
    {
      headers: {
        Authorization: `${import.meta.env.VITE_API_KEY_BEAR}`,
      },
    }
  );

  const data = await res.json();

  return data;
};

export const rateMovie = async (movieId: number, rating: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem(
      'guest_session_id'
    )}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rating }),
    }
  );
  if (res.status !== 201) throw new Error('Failed to rate movie');
  return res.json();
};

export const rateTv = async (tvId: number, rating: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/rating?guest_session_id=${localStorage.getItem(
      'guest_session_id'
    )}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rating }),
    }
  );
  if (res.status !== 201) throw new Error('Failed to rate TV show');
  return res.json();
};
