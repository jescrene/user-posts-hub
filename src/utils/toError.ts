/**
 * Normalizes any thrown value to an Error, so hooks always expose the same type.
 * @param value - Value caught in a `catch`.
 */
export const toError = (value: unknown): Error =>
    value instanceof Error ? value : new Error(String(value));
