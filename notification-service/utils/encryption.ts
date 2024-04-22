import crypto, { CipherGCMTypes } from "crypto";
import { IAppointmentProps } from "../types/appointment.interface";
require("dotenv").config();

const secret_iv = crypto.randomBytes(16);
const secret_key = process.env.HASH_SECRET_KEY;
const ecnryption_method = process.env.HASH_ENCRYPTION_METHOD as CipherGCMTypes;

if (!secret_key || !secret_iv || !ecnryption_method) {
  throw new Error("secretKey, secretIV, and ecnryptionMethod are required");
}

const key = crypto
  .createHash("sha512")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);

export default function generateAndShareHash(
  currentAppointment: IAppointmentProps,
  newAppointment?: IAppointmentProps
) {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 2);
  let toEncrypt = {};
  toEncrypt = {
    current_app_id: currentAppointment.id,
    open_app_id: newAppointment ? newAppointment.id : null,
    expirationDate
  };
  const toEncryptString = JSON.stringify(toEncrypt);
  const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV);
  const hash = Buffer.from(
    cipher.update(toEncryptString, "utf8", "hex") + cipher.final("hex")
  ).toString("base64");

  return { hash, encryptionIV };
}
