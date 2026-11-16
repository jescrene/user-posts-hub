import { API_BASE_URL } from '@/constants/api';

import { HttpError } from './HttpError';

/** HTTP methods supported by the request function. */
type HttpMethod = 'GET' | 'POST';

/**
 * Options for the request function.
 */
interface RequestOptions {
    method?: HttpMethod;
    /** Data sent as the JSON body of the request. */
    body?: unknown;
    /** Signal that cancels the request, e.g. when the component unmounts. */
    signal?: AbortSignal;
}

/**
 * Sends a request to the API and parses its JSON response.
 * @param path - Endpoint relative to `API_BASE_URL`, e.g. `/users`.
 * @param options - Method, body and abort signal of the request.
 * @returns The parsed response body.
 * @throws {HttpError} When the response status is not 2xx.
 * @throws {TypeError} When the network fails.
 * Used by {@link getUsers}, {@link getPostsByUser} and {@link createPost}.
 */
export const request = async <T>(
    path: string,
    { method = 'GET', body, signal }: RequestOptions = {},
): Promise<T> => {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, {
        body: body === undefined ? undefined : JSON.stringify(body),
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
        method,
        signal,
    });

    if (!response.ok) throw new HttpError(response.status, url);

    return (await response.json()) as T;
};
