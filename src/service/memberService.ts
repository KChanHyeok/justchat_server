
import { IMember, IUpdateMember } from '@interfaces/memberInterface';
import {clietDB} from '@util/db';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/util/firebase';


export const MemberUpdate = async (body: IUpdateMember) => {
    try {
        const { member_id, nick_name, profile_key }:IUpdateMember = body
        if(!member_id) return {success: false, message: '회원아이디가 입력되지 않았습니다.'}
        if(!nick_name && !profile_key) return {success: false, message: '변경할 정보가 없습니다.'}
        const result = await clietDB.collection('member').updateOne({member_id: member_id}, {$set: { nick_name: nick_name, profile_key: profile_key, change_date: new Date()  }})
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
        const profileUrlPromises = member.map(async (m) => {
            try {
                const url = await getDownloadURL(ref(storage, m.profile_key));
                return { ...m, profile_url: url };
            } catch {
                return { ...m, profile_url: '' };
            }
        });
        const memberWithUrls = await Promise.all(profileUrlPromises)
        return {success: true, message: '회원리스트', data:{ list: memberWithUrls, total_count }}
    } catch(err) {
        throw err;
    }
}


