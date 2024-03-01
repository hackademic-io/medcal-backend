import { Request, Response, NextFunction } from 'express';
import decryptData from '../utils/decryption';

const hashMiddlware = (req: Request, res: Response, next: NextFunction) => {
  const { hash, encryptionIV } = req.body;

  if (!hash || !encryptionIV) {
    return next(new Error('Hash or EncryptionIV is missing'));
  }

  try {
    const decryptedString = decryptData(hash, encryptionIV);
    const decryptedData = JSON.parse(decryptedString);

    const currentDate = new Date();
    const expirationDate = new Date(decryptedData.expirationDate);

    if (expirationDate > currentDate) {
      return next(new Error('Hash expired'));
    }

    req.body.decryptedData = decryptedData;
  } catch (error) {
    return next(new Error('Error decrypting the hash:' + error));
  }

  next();
};

export default hashMiddlware;
