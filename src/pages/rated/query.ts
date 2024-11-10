export const getRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      'guest_session_id'
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDZkY2QyMmVmYzUzNDQ1OTgwNmY0N2Y3NThjOGI4MSIsIm5iZiI6MTczMTI3MDQwNS42MjM3ODIyLCJzdWIiOiI1ZjVmZmRlNTkzMzg4YjAwMzc1YjljNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.17NOctTvx8nPGviwCbDk0pUVPfZe_XKIPKmrNcuKaWY',
      },
    }
  );

  return res.json();
};

export const getRatedTv = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      'guest_session_id'
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
  );

  return res.json();
};
