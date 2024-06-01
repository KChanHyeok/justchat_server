import { Request, Response } from "express"
import { Register, Login, MemberList } from "@service/memberService" 

export const register = async (req:Request, res: Response) => {
    try {
        return res.send(await Register(req.body)) 
    }catch(err){
        throw err
    }
}

export const login = async (req:Request, res: Response) => {
    try {
        return res.send(await Login(req.body))
    }catch(err){
        throw err
    }
 }

 export const memberList = async (req:Request, res: Response) => { 
    try {
        return res.send(await MemberList(req.body))
    } catch(err) {
        throw err;
    }
 }