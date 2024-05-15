
import swaggerJSDoc from 'swagger-jsdoc';
import { decrypt, encrypt } from '../util/crypto';
import {client} from '../util/db';

export const Register = async (body: any) => {
    try {
        const bdo = await client.db('just_chat')
        let {member_id, member_pwd, member_name, nick_name } = body
        const user = await bdo.collection('member').findOne({member_id})
        if(user) return {success: false, message: '이미 가입한 회원입니다'}
        member_pwd = await encrypt(member_pwd)
        if(member_pwd===null) return {success: false, message: '회원가입실패 key가 존재하지 않습니다'}
        
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

export const Login = async (body: any) => {
    try {
        const bdo = await client.db('just_chat')
        let {member_id, member_pwd} = body
        const result: any = await bdo.collection('member').findOne({member_id})
        if(!result) return {success: false, message:'존재하지 않는 아이디 입니다'}
        if(member_pwd !== await decrypt(result.member_pwd)) return {success: false, message: '패스워드가 맞지 않습니다'}
        const data = {
            member_id: result.member_id,
            member_name: result.member_name,
            nick_name: result.nick_name,
            reg_date: result.reg_date
        } 
        return {success: true, message: '로그인성공', data}
        
    }catch(err){
        throw err;
    }
}


