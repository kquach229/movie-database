export const getMovieDetails = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `${import.meta.env.VITE_API_KEY_BEAR}`,
    },
  });
  return res.json();
};
