export interface IRegister {
    member_id : string;
    member_pwd: string | null;
    member_name : string;
    nick_name?: string ;
    profile_file?: string;
}

export interface ILogin {
    member_id : string;
    member_pwd: string | null;
}

export interface IMember {
    keyword: string;
    page_current: number;
    per_page: number;
}