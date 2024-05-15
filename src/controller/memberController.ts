import { Request, Response } from "express"
import { Register } from "../service/memberService" 

export const register = async (req:Request, res: Response) => {
    try {
        return res.send(await Register(req.body)) 
    }catch(err){
        throw err
    }
}