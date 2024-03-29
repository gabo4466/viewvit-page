import type { User } from "./user.interface";
// Generated by https://quicktype.io

export interface Post {
    id_post?: string;
    subject: string;
    content: string;
    lastUpdated?: string;
    isDeleted?: boolean;
    user?: User;
}
