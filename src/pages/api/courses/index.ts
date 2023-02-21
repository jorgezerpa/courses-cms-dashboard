import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch('http://localhost:3001/api/v1/courses', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
  const result = await response.json();
  
  res.status(200).json({test:'test'});
});