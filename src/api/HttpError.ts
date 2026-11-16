/**
 * Error thrown when the API answers with a status outside the 2xx range.
 */
export class HttpError extends Error {
    /** HTTP status of the response, e.g. 404. */
    readonly status: number;

    /**
     * @param status - HTTP status of the response.
     * @param url - Requested URL, included in the message to help debugging.
     */
    constructor(status: number, url: string) {
        super(`Request to ${url} failed with status ${status}`);
        this.name = 'HttpError';
        this.status = status;
    }
}
