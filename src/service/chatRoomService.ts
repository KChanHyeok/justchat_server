import { client } from "../util/db"
// import {nanoid} from 'nanoid'

export const SelectChatRoom = async (body:any) => {
    try {
        const bdo = await client.db('just_chat')
        let {member_id, chat_name} = body;
        console.log(member_id)
        const channer_no_list = await bdo.collection('chat_room_member').find({member_id: member_id}).toArray()
        
        console.log(channer_no_list.map(d=> d.channer_no))
        // const chat_room = await bdo.collection('chat_room').find(channer_no_list).toArray()
        // console.log(chat_room)        // return {success: true, message: '해당 회원의 채팅방 리스트', data: chat_room}
    } catch(err){
        throw err
    }
}

export const CreateChatRoom = async (body: any) => {
    try  {
        const bdo = await client.db('just_chat')
        let { member_id, channer_name ,connect_key, memo, reg_date } = body
        const num = Math.random()
        const params = {
            channer_no: num,
            channer_name,
            member_id,
            connect_key,
            memo,
            reg_date,
            del_yn: 'n'
        }
        const member = {
            channer_no: num,
            member_id,
            level: 'master'
        }
        await bdo.collection('chat_room').insertOne(params)
        await bdo.collection('chat_room_member').insertOne(member)
        return {success: true, message: '채팅방 생성 완료!'}
    }catch(err) {
        throw err;
    }
}