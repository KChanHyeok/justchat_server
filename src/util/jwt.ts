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

export const verifyRefreshToken = (token: string) => {
    try {
        if(!process.env.JWT_REFRESH_TOKEN_SECRET) {  
            console.log('TOKEN_SECRET null')
            return null} 
        const verify = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
        return verify
    } catch(err){
        throw err
    }
}