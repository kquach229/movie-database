export const mutationLogin = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
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
