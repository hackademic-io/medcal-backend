import crypto, { CipherGCMTypes } from 'crypto'
import sendEmail from '../models/sendEmail'
import { IAppointmentProps } from '../types/appointment.interface';

const secret_iv = crypto.randomBytes(16);
const secret_key = process.env.HASH_SECRET_KEY
const ecnryption_method = process.env.HASH_ENCRYPTION_METHOD as CipherGCMTypes


if (!secret_key || !secret_iv || !ecnryption_method) {
    throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
}

const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)

const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)

function encryptData(data: string) {
    const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64')
}

export default function sendEmailWithHash(appointment: IAppointmentProps) {
    const emailType = 'rescheduling-prompt'
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);
    const toEncrypt = {
        id: appointment.id,
        expirationDate,
    }
    const toEncryptString = JSON.stringify(toEncrypt)
    const hash = encryptData(toEncryptString)
    sendEmail(emailType, appointment, hash)
    fetch('http://localhost:3000/appointment/hash', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hash,
            encryptionIV,
        })
    })
}