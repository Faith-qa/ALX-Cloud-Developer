// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'g68dauh4uh'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-wg5i5b-c.us.auth0.com',            // Auth0 domain
  clientId: 'JgPgsDRjuR1unem4sH9WgdwkVOg8C4ca',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
