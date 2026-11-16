import type { UsersPanelUiTexts } from '../constants/usersPanelUiTexts';

interface UsersSubtitleParams {
    error: Error | null;
    loading: boolean;
    /** Number of users that match the search. */
    shownCount: number;
    /** Number of users. */
    totalCount: number;
}

/**
 * @param params - Request state of the users and how many are shown.
 * @param texts - Texts of the users panel in the language of the interface.
 * @returns Subtitle of the users panel: a loading text, the count ("10 users"), the matches while
 * searching ("3 of 10 users"), or nothing after an error.
 */
export const getUsersSubtitle = (
    { error, loading, shownCount, totalCount }: UsersSubtitleParams,
    texts: UsersPanelUiTexts,
) => {
    if (loading) return texts.loadingText;
    if (error) return undefined;

    return shownCount === totalCount
        ? texts.usersCount(totalCount)
        : texts.usersMatchCount(shownCount, totalCount);
};
