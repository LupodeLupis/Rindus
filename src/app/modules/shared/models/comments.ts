export const COMMENTS_TABLE_COLUMNS = ['postId', 'id', 'name', 'email', 'body'];

export interface Comment {
    postId: number;
    id: number;
    email: string;
    body: string;
}