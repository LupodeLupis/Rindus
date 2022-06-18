export const POSTS_TABLE_COLUMNS = ['userId', 'id', 'title', 'body', 'comments'];

export interface Post {
    userId: string;
    id: string;
    title: string;
    body: string
};