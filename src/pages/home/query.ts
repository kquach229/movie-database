export const fetchMovies = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    {
      headers: {
        Authorization:
          'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDZkY2QyMmVmYzUzNDQ1OTgwNmY0N2Y3NThjOGI4MSIsIm5iZiI6MTczMTI3MDUyNC43NTA5Mjc3LCJzdWIiOiI1ZjVmZmRlNTkzMzg4YjAwMzc1YjljNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zcVX71joebz2W-ds2UW_nrbxTijrnsYm8m2zvf8xCHo',
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
        Authorization:
          'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDZkY2QyMmVmYzUzNDQ1OTgwNmY0N2Y3NThjOGI4MSIsIm5iZiI6MTczMTI3MDUyNC43NTA5Mjc3LCJzdWIiOiI1ZjVmZmRlNTkzMzg4YjAwMzc1YjljNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zcVX71joebz2W-ds2UW_nrbxTijrnsYm8m2zvf8xCHo',
      },
    }
  );

  const data = await res.json();

  return data;
};

export const rateMovie = async (movieId, rating) => {
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

export const rateTv = async (tvId, rating) => {
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
