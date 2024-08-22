import { Request, Response } from "express"
import { Register, Login } from "@/service/authService"

export const register = async (req:Request, res: Response) => {
    try {
        const result = await Register(req.body)
        return res.send(result) 
    }catch(err){
        throw err
    }
}

export const login = async (req:Request, res: Response) => {
    try {
        const result = await Login(req.body)
        return res.send(result)
    }catch(err){
        throw err
    }
 }

 