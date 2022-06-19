export const POSTS_TABLE_COLUMNS = ['userId', 'id', 'title', 'body', 'comments'];

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string
};