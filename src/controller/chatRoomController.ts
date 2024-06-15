import { Request, Response } from "express";
import {CreateChatRoom, SelectChatRoom} from '../service/chatRoomService'

export const selectChatRoom = async (req: any, res: Response) => {
    try {
        const result = await SelectChatRoom(req.query)
        return res.send(result)
    }catch(err){
        throw err;
    }
}

export const createChatRoom = async (req:Request, res:Response) => {
    try {
        const result = await CreateChatRoom(req.body)
        return res.send(result)
    }catch(err){
        throw err
    }
}