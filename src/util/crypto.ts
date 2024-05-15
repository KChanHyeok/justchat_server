import CryptoJS from "crypto-js";
import path from 'path'
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '../../.env')})

export const encrypt = (payload: string) => {
    try {
        const secret_key = process.env.CRYPTO_SECRET_KEY;
        if(!secret_key) {
            console.log("No Secret Key");
            return null
        }
        const encrypted = CryptoJS.AES.encrypt(payload, secret_key).toString();
        return  encrypted;
    } catch (err) {
        console.log(`Encryption error occur : ${err}`);
        return null
    }
}

export const decrypt = (payload: string) => {
    try {
        const secret_key = process.env.CRYPTO_SECRET_KEY;
        if(!secret_key) {
            console.log("No Secret Key");
            return null
        }
        const decrypted = CryptoJS.AES.decrypt(payload, secret_key).toString(CryptoJS.enc.Utf8);
        return decrypted
    }catch (err) {
        console.log(`Decryption error occur : ${err}`);
        return null
    }
}