import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/util/jwt';
import { ILogin, IMember, IRegister, IUpdateMember } from '@interfaces/memberInterface';
import { decrypt, encrypt } from '@util/crypto';
import {clietDB} from '@util/db';

export const Register = async (body: IRegister) => {
    try {
        let {member_id, member_pwd, member_name, nick_name, profile_key  } = body
        const user = await clietDB.collection('member').findOne({member_id})
        if(user) return {success: false, message: '이미 가입한 회원입니다'}
        member_pwd = encrypt(member_pwd)
        if(member_pwd===null) return {success: false, message: '회원가입실패 key가 존재하지 않습니다'}
        
        const refresh_token = await signRefreshToken(member_id)
        if(refresh_token===null) return {success: false, message: '토큰생성실패'}
        const params = {
            member_id,
            member_pwd,
            member_name,
            nick_name,
            refresh_token,
            profile_key,
            del_yn: 'n',
            reg_date: new Date()
        }
        await clietDB.collection('member').insertOne(params)
        return {success: true, message: '회원가입완료'}
    } catch(err){
        throw err;
    }
}

export const Login = async (body: ILogin) => {
    try {
        let {member_id, member_pwd} = body
        const result: any = await clietDB.collection('member').findOne({member_id})
        if(!result) return {success: false, message:'존재하지 않는 아이디 입니다'}
        if(member_pwd !== decrypt(result.member_pwd)) return {success: false, message: '패스워드가 맞지 않습니다'}
        // const verify: any = verifyRefreshToken(result.refresh_token)

        // if(verify?.name == 'TokenExpiredError'){
            
        // }else {
            const access_token = signAccessToken(member_id);
        // }

        const data = {
            member_id: result.member_id,
            member_name: result.member_name,
            nick_name: result.nick_name,
            reg_date: result.reg_date,
            access_token,
            refresh_token: result.refresh_token,
            profile_key: result.profile_key,
        } 
        return {success: true, message: '로그인성공', data}
        
    }catch(err){
        throw err;
    }
}

export const MemberUpdate = async (body: IUpdateMember) => {
    try {
        const { member_id, nick_name, profile_key }:IUpdateMember = body
        if(!member_id) return {success: false, message: '회원아이디가 입력되지 않았습니다.'}
        if(!nick_name && !profile_key) return {success: false, message: '변경할 정보가 없습니다.'}
        const result = await clietDB.collection('member').updateOne({member_id: member_id}, {$set: { nick_name: nick_name, profile_file: profile_key, change_date: new Date()  }})
        if(result.modifiedCount === 1) return {success: true, message: '회원정보 수정완료'}
        return {success: false, message: '회원이 존재하지 않습니다'}
    } catch(err) {
        throw err;
    }
}

export const MemberDelete = async (body: any) => { 
    try {
        const {member_id} = body
        const result = await clietDB.collection('member').updateOne({member_id}, {$set: {del_yn: 'y'}})
        if(result.modifiedCount === 1) return {success: true, messsage: '회원탈퇴완료'}
    }catch(err){
        throw err;
    }
}

export const MemberList = async (body: IMember) => {
    try {
        const {keyword, page_current, per_page} = body
        const offset = (page_current-1) * per_page
        const member = await clietDB.collection('member').find({member_id: {$regex: keyword}}, {projection:{
            _id:0,
            member_id: 1,
            profile_key:1,
            nick_name: 1,
            member_name: 1,
        }}).limit(Number(per_page)).skip(offset).toArray()
        const total_count = (await clietDB.collection('member').find({member_id: {$regex: keyword}}).toArray()).length
        return {success: true, message: '회원리스트', data:{ list: member, total_count }}
    } catch(err) {
        throw err;
    }
}


