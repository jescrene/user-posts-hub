import type { Post } from '@/types/post';
import type { User } from '@/types/user';

/**
 * @param id - Id of the user.
 * @param name - Full name of the user.
 * @param username - Handle of the user.
 */
const buildUser = (id: number, name: string, username: string): User => ({
    address: {
        city: 'Gwenborough',
        geo: { lat: '-37.3159', lng: '81.1496' },
        street: 'Kulas Light',
        suite: 'Apt. 556',
        zipcode: '92998-3874',
    },
    company: { bs: 'harness e-markets', catchPhrase: 'Client-server neural-net', name: 'Acme' },
    email: `${username.toLowerCase()}@example.com`,
    id,
    name,
    phone: '1-770-736-8031',
    username,
    website: 'example.com',
});

export const USERS_FIXTURE: User[] = [
    buildUser(1, 'Leanne Graham', 'Bret'),
    buildUser(2, 'Ervin Howell', 'Antonette'),
    buildUser(3, 'Clementine Bauch', 'Samantha'),
];

export const POSTS_FIXTURE: Post[] = [
    { body: 'First post body', id: 1, title: 'First post', userId: 1 },
    { body: 'Second post body', id: 2, title: 'Second post', userId: 1 },
    { body: 'Ervin post body', id: 11, title: 'Ervin post', userId: 2 },
];

/** Id JSONPlaceholder gives to every created post. */
export const CREATED_POST_ID = 101;
