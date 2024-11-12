export const getTvDetails = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      Authorization: `${import.meta.env.VITE_API_KEY_BEAR}`,
    },
  });

  return res.json();
};
