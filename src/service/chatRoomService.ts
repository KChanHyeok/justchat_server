import {  ICreateChatRoom, ISelectChatRoom } from "@interfaces/chatRoomInterface";
import { client } from "@util/db"
import { nanoid } from "nanoid";

export const SelectChatRoom = async (body: ISelectChatRoom) => {
    try {
        const bdo = client.db('just_chat')
        let {member_id, channer_name, page_current, per_page} = body;
        const channer_no_list = await bdo.collection('chat_room_member').find({member_id: member_id}).toArray()
        const list = channer_no_list.map(d=> d.channer_no) 
        const offset = (page_current-1) * per_page
        const chat_room = await bdo.collection('chat_room').find({channer_no: {$in:list}},
            {projection:{
            _id:0,
            channer_no: 1,
            channer_name: 1,
            member_id: 1,
            memo: 1,
        }}).limit(per_page).skip(offset).toArray()
        const total_count = (await bdo.collection('chat_room').find({channer_no: {$in:list}}).toArray()).length
        return {success: true, message: '해당 회원의 채팅방 리스트', data: {list:chat_room, total_count}}
    } catch(err){
        throw err
    }
}

export const CreateChatRoom = async (body: ICreateChatRoom) => {
    try  {
        const chat_member = []
        const bdo = client.db('just_chat')
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

        await bdo.collection('chat_room').insertOne(params)
        await bdo.collection('chat_room_member').insertMany(chat_member)
        return {success: true, message: '채팅방 생성 완료!'}
    }catch(err) {
        throw err;
    }
}