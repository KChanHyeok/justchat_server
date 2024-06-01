export interface ISelectChatRoom {
    member_id: string;
    channer_name?: string;
    page_current: number;
    per_page: number;
}

export interface ICreateChatRoom {
    member_id: string;
    channer_name: string;
    connect_key?: string;
    invite_member: string[];
}