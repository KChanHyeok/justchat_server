import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signRefreshToken = async (member: string) => {
    const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const expireIn = process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRATION_TIME;

    if(secret === undefined) return null
    
    const payload = {
        member_id: member
    }
    
    return jwt.sign(payload, secret, {expiresIn: expireIn})
}

export const signAccessToken  =  (member_id: any) => {
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const expireIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
    if(secret === undefined) return null

    const payload = {
        member_id
    }
    return jwt.sign(payload, secret, {expiresIn: expireIn})
}

// Verify Access Token
export const accessAuth = async (req: Request, res: Response, next: NextFunction) => {

    const authToken = req.headers['authorization']
    try {
        if (!authToken || !authToken.startsWith('Bearer ')) {
            // throw res.status(401).send({ error: 'Access token is missing or invalid' });
            return new Error('Access token is missing or invalid')
        }
        // Bearer 분리
        const token = authToken.split(' ')[1];
        if(!process.env.JWT_ACCESS_TOKEN_SECRET) { 
            console.log('TOKEN_SECRET null')
            return null
        }
        const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err: any)=> {
            if(err) {
                next(res.status(403).send({ error: err })) 
            }
        });
        // console.log(payload)
        next()
    } catch(err: any){
        return new Error('Invalid token')
        // return res.status(500).send({error: err.message  || 'Internal Server Error'  }); 
    }
}



