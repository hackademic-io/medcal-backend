import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';
const { expressjwt: jwt } = require('express-jwt');

dotenv.config();

const authMiddleware = () => {
  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.ISSUER_URL}.well-known/jwks.json`,
    }),
    audience: 'http://localhost:3001',
    issuer: process.env.ISSUER_URL,
    algorithms: ['RS256'],
  });
};

export default authMiddleware;
