import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import decryptData from '../utils/decryption';
const { expressjwt: jwt } = require('express-jwt');

dotenv.config();

export interface IMiddlewareRequest extends Request {
  decryptedData: any;
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.ISSUER_URL}/.well-known/jwks.json`,
    }),
    audience: 'http://localhost:3001',
    issuer: process.env.ISSUER_URL,
    algorithms: ['RS256'],
  });

  jwtCheck(req, res, (err: any) => {
    if (err) {
      const { hash, encryptionIV } = req.body;
      if (hash && encryptionIV) {
        const decryptedString = decryptData(hash, encryptionIV);
        const decryptedData = JSON.parse(decryptedString);

        if (decryptedData) {
          const currentDate = new Date();
          const expirationDate = new Date(decryptedData.expirationDate);

          if (expirationDate > currentDate) {
            (req as IMiddlewareRequest).decryptedData = decryptedData;
            next();
            return;
          }
        }
      }
      console.error(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });
}

export default authMiddleware;
