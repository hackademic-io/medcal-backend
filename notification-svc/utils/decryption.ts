import crypto, { CipherGCMTypes } from 'crypto';

const secret_key = process.env.HASH_SECRET_KEY;
const ecnryption_method = process.env.HASH_ENCRYPTION_METHOD as CipherGCMTypes;

if (!secret_key || !ecnryption_method) {
  throw new Error('secretKey and ecnryptionMethod are required');
}

const key = crypto
  .createHash('sha512')
  .update(secret_key)
  .digest('hex')
  .substring(0, 32);

export default function decryptData(
  encryptedData: string,
  encryptionIV: string
) {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(
    ecnryption_method,
    key,
    encryptionIV
  );
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  );
}
