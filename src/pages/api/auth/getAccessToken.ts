import { getAccessToken as getToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function getAccessToken(req, res) {
   try {
       const { accessToken } = await getToken(req, res, ); // get access token from auth0 sdk, renamed to avoid collision qith endpoint function name
       res.status(200).send(accessToken);
   } catch (error) {
        res.status(500).send(null)
   }
});