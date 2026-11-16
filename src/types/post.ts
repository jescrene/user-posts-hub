/** Post returned by `GET /users/:id/posts` and `POST /posts`. */
export interface Post {
    id: number;
    /** Id of the user who wrote the post. */
    userId: number;
    title: string;
    body: string;
}

/** Data sent to `POST /posts` to create a post. */
export type NewPost = Omit<Post, 'id'>;
