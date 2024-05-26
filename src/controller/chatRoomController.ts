import { Request, Response } from "express";
import {CreateChatRoom, SelectChatRoom} from '../service/chatRoomService'

export const selectCharRoom = async (req: Request, res: Response) => {
    try {
        return res.send(await SelectChatRoom(req.body))
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