import { USERS_ENDPOINT } from '@/constants/api';
import type { User } from '@/types/user';

import { request } from './httpClient';

/**
 * Gets every user.
 * @param signal - Cancels the request.
 * Used by {@link getUsers}.
 */
export const getUsers = (signal?: AbortSignal) => request<User[]>(USERS_ENDPOINT, { signal });
