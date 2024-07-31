import {  ICreateChatRoom, ISelectChatRoom } from "@interfaces/chatRoomInterface";
import { clietDB } from "@util/db"
import { nanoid } from "nanoid";

export const SelectChatRoom = async (body: ISelectChatRoom) => {
    try {
        let {member_id, channer_name, page_current, per_page} = body;
        const channer_no_list = await clietDB.collection('chat_room_member').find({member_id: member_id}).toArray()
        const list = channer_no_list.map(d=> d.channer_no) 
        const offset = (page_current-1) * per_page
        const chat_room = await clietDB.collection('chat_room').find({channer_no: {$in:list}},
            {projection:{
            _id:0,
            channer_no: 1,
            channer_name: 1,
            member_id: 1,
            memo: 1,
        }}).limit(Number(per_page)).skip(offset).toArray()
        const total_count = (await clietDB.collection('chat_room').find({channer_no: {$in:list}}).toArray()).length +1

        const total_page = Math.ceil( Number(total_count) / Number(per_page))
        return {success: true, message: '해당 회원의 채팅방 리스트', data: {list:chat_room, total_count, total_page}}
    } catch(err){
        throw err
    }
}

export const CreateChatRoom = async (body: ICreateChatRoom) => {
    try  {
        const chat_member = []
        let { member_id, channer_name ,connect_key, invite_member } = body
        if(invite_member.length< 1) return {success: false, message: '채팅방에 초대한 인원이 없습니다'}
        const num = nanoid().toString()
        const params = {
            channer_no: num,
            channer_name,
            member_id,
            connect_key,
            reg_date: new Date(),
            del_yn: 'n'
        }
        const master = {
            channer_no: num,
            member_id,
            level: 'master'
        }

        chat_member.push(master)

        for(let i=0; i<invite_member.length; i++  ){
            chat_member.push({
                channer_no: num,
                member_id: invite_member[i],
                level:'member'
            })
        }

        await clietDB.collection('chat_room').insertOne(params)
        await clietDB.collection('chat_room_member').insertMany(chat_member)
        return {success: true, message: '채팅방 생성 완료!', channer_no: num}
    }catch(err) {
        throw err;
    }
}

export const UpdateChatRoom = async (body: any) => {
    try {
        const {channer_no, channer_name ,connect_key} = body;
        const result = await clietDB.collection('chat_room').updateOne({channer_no}, {$set: {channer_name, connect_key}})
        if(result.modifiedCount === 1) return {success: true, message:'채팅방 수정 완료'}
        return {success: false, message: '채팅방이 존재하지 않습니다'}
    } catch(err) {
        throw err;
    }
}