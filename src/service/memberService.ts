import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/util/jwt';
import { ILogin, IMember, IRegister } from '@interfaces/memberInterface';
import { decrypt, encrypt } from '@util/crypto';
import {client} from '@util/db';

export const Register = async (body: IRegister) => {
    try {
        const bdo = client.db('just_chat')
        let {member_id, member_pwd, member_name, nick_name, profile_file  } = body
        const user = await bdo.collection('member').findOne({member_id})
        if(user) return {success: false, message: '이미 가입한 회원입니다'}
        member_pwd = encrypt(member_pwd)
        if(member_pwd===null) return {success: false, message: '회원가입실패 key가 존재하지 않습니다'}
        
        const refesh_token = await signRefreshToken(member_id)
        if(refesh_token===null) return {success: false, message: '토큰생성실패'}
        const params = {
            member_id,
            member_pwd,
            member_name,
            nick_name,
            refesh_token,
            profile_file,
            del_yn: 'n',
            reg_date: new Date()
        }
        await bdo.collection('member').insertOne(params)
        return {success: true, message: '회원가입완료'}
    } catch(err){
        throw err;
    }
}

export const Login = async (body: ILogin) => {
    try {
        const bdo = client.db('just_chat')
        let {member_id, member_pwd} = body
        const result: any = await bdo.collection('member').findOne({member_id})
        if(!result) return {success: false, message:'존재하지 않는 아이디 입니다'}
        if(member_pwd !== decrypt(result.member_pwd)) return {success: false, message: '패스워드가 맞지 않습니다'}
        // const verify: any = verifyRefreshToken(result.refresh_token)

        // if(verify?.name == 'TokenExpiredError'){
            
        // }else {
            const accessToken = signAccessToken(member_id);
        // }

        const data = {
            member_id: result.member_id,
            member_name: result.member_name,
            nick_name: result.nick_name,
            reg_date: result.reg_date,
            accessToken,
            refesh_token: result.refesh_token,
            profile_file: result.profile_file,
        } 
        return {success: true, message: '로그인성공', data}
        
    }catch(err){
        throw err;
    }
}

export const MemberList = async (body: IMember) => {
    try {
        const {keyword, page_current, per_page} = body
        const bdo =  client.db('just_chat')
        const offset = (page_current-1) * per_page
        const member = await bdo.collection('member').find({member_id: {$regex: keyword}}, {projection:{
            _id:0,
            member_id: 1,
            profile_file:1,
            nick_name: 1,
            member_name: 1,
        }}).limit(Number(per_page)).skip(offset).toArray()
        const total_count = (await bdo.collection('member').find({member_id: {$regex: keyword}}).toArray()).length
        return {success: true, message: '회원리스트', data:{ list: member, total_count }}
    } catch(err) {
        throw err;
    }
}


