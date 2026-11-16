import { useCallback, useEffect, useState } from 'react';

import { toError } from '@/utils/toError';

/** Function that loads data and stops when the signal is aborted. */
export type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

/**
 * Result of a data hook: the data, error and loading states, and a function to retry the request.
 * The `retry` function is stable and can be used in a `useEffect` dependency array.
 */
export interface FetchResult<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
    retry: () => void;
}

/** Outcome of a request, tagged with the fetcher and attempt that produced it. */
interface SettledRequest<T> {
    attempt: number;
    data: T | null;
    error: Error | null;
    fetcher: Fetcher<T>;
}

/**
 * Generic data hook: runs `fetcher` when it changes and exposes the loading and error states.
 * The loading state is derived from whether the stored outcome belongs to the current request, and
 * the previous request is aborted when the fetcher changes or the component unmounts, so a late
 * response never overwrites newer data.
 * @param fetcher - Memoized function that loads the data, or `null` to load nothing.
 * Used by {@link usePostsByUser} to load the posts of a user.
 */
export const useFetch = <T>(fetcher: Fetcher<T> | null): FetchResult<T> => {
    const [settled, setSettled] = useState<SettledRequest<T> | null>(null);
    const [attempt, setAttempt] = useState(0);

    /**
     * Runs the fetcher and stores the outcome, unless the request is aborted.
     * The outcome is tagged with the fetcher and attempt that produced it, so the loading state can
     * be derived from whether the stored outcome belongs to the current request.
     * The previous request is aborted when the fetcher changes or the component unmounts, so a late
     * response never overwrites newer data.
     */
    useEffect(() => {
        if (!fetcher) return undefined;

        const controller = new AbortController();

        fetcher(controller.signal)
            .then((data) => setSettled({ attempt, data, error: null, fetcher }))
            .catch((error: unknown) => {
                if (controller.signal.aborted) return;
                setSettled({
                    attempt,
                    data: null,
                    error: toError(error),
                    fetcher,
                });
            });

        return () => controller.abort();
    }, [attempt, fetcher]);

    // Function to retry the request by incrementing the attempt counter, which triggers the effect.
    const retry = useCallback(() => setAttempt((current) => current + 1), []);
    // Whether the stored outcome belongs to the current request, used to derive the loading state.
    const isCurrent = settled?.fetcher === fetcher && settled.attempt === attempt;

    return {
        data: isCurrent ? settled.data : null,
        error: isCurrent ? settled.error : null,
        loading: Boolean(fetcher) && !isCurrent,
        retry,
    };
};
