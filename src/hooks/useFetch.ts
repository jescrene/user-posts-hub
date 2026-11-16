import { useCallback, useEffect, useState } from 'react';

/** Function that loads data and stops when the signal is aborted. */
export type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

export interface FetchResult<T> {
    /** Loaded data, or `null` while loading, after an error or when there is no fetcher. */
    data: T | null;
    /** Error of the last request, or `null`. */
    error: Error | null;
    /** Whether a request is in progress. */
    loading: boolean;
    /** Repeats the request, e.g. after an error. */
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
 */
export const useFetch = <T>(fetcher: Fetcher<T> | null): FetchResult<T> => {
    const [settled, setSettled] = useState<SettledRequest<T> | null>(null);
    const [attempt, setAttempt] = useState(0);

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
                    error: error instanceof Error ? error : new Error(String(error)),
                    fetcher,
                });
            });

        return () => controller.abort();
    }, [attempt, fetcher]);

    const retry = useCallback(() => setAttempt((current) => current + 1), []);
    const isCurrent = settled?.fetcher === fetcher && settled.attempt === attempt;

    return {
        data: isCurrent ? settled.data : null,
        error: isCurrent ? settled.error : null,
        loading: Boolean(fetcher) && !isCurrent,
        retry,
    };
};
