import { Request, Response } from "express";
import {CreateChatRoom, SelectChatRoom} from '../service/chatRoomService'

export const selectChatRoom = async (req: any, res: Response) => {
    try {
        return res.send(await SelectChatRoom(req.query))
    }catch(err){
        throw err;
    }
}

export const createChatRoom = async (req:Request, res:Response) => {
    try {
        return res.send(await CreateChatRoom(req.body))
    }catch(err){
        throw err
    }
}