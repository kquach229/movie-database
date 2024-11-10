export const getMovieDetails = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization:
        'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDZkY2QyMmVmYzUzNDQ1OTgwNmY0N2Y3NThjOGI4MSIsIm5iZiI6MTczMTI3MDUyNC43NTA5Mjc3LCJzdWIiOiI1ZjVmZmRlNTkzMzg4YjAwMzc1YjljNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zcVX71joebz2W-ds2UW_nrbxTijrnsYm8m2zvf8xCHo',
    },
  });
  return res.json();
};
