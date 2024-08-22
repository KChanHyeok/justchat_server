import { Request, Response } from "express"
import { MemberList, MemberUpdate, MemberDelete } from "@service/memberService" 

 export const memberUpdate = async (req:Request, res: Response) => {
    try {
        const result = await MemberUpdate(req.body)
        return res.send(result)
    } catch(err) {
        throw err;
    }
  }

export const memberDelete = async (req:Request, res: Response) => {
    try {
        const result = await MemberDelete(req.body)
        return res.send(result)
    } catch(err) {
        throw err;
    }
} 

 export const memberList = async (req:any, res: Response) => { 
    try {
        const result = await MemberList(req.query)
        return res.send(result)
    } catch(err) {
        throw err;
    }
 }