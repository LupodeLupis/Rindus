export const COMMENTS_TABLE_COLUMNS = ['postId', 'id', 'name', 'email', 'body'];

export interface Comment {
    postId: string;
    id: string;
    email: string;
    body: string;
}