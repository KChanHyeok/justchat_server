
import { encrypt } from '../util/crypto';
import {client} from '../util/db';


export const Register = async (body: any) => {
    try {
        let {member_id, member_pwd, member_name, nick_name } = body
        const bdo = await client.db('just_chat')
        member_pwd = await encrypt(member_pwd)
        
        const params = {
            member_id,
            member_pwd,
            member_name,
            nick_name,
            reg_date: new Date()
        }
        await bdo.collection('member').insertOne(params)
        return {success: true, message: '회원가입완료'}
    } catch(err){
        throw err;
    }
}



