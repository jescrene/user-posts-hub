import { describe, expect, it } from 'vitest';

import { USERS_FIXTURE } from '@/test/msw/fixtures';

import { filterUsersByName } from '../filterUsersByName';

const getNames = (search: string) =>
    filterUsersByName(USERS_FIXTURE, search).map(({ name }) => name);

describe('filterUsersByName', () => {
    it('keeps every user when the search is empty or only spaces', () => {
        expect(filterUsersByName(USERS_FIXTURE, '   ')).toEqual(USERS_FIXTURE);
    });

    it('matches any part of the name ignoring case and surrounding spaces', () => {
        expect(getNames('  graHAM ')).toEqual(['Leanne Graham']);
        expect(getNames('e')).toEqual(['Leanne Graham', 'Ervin Howell', 'Clementine Bauch']);
    });

    it('ignores accents in the search and in the name', () => {
        expect(getNames('clémentine')).toEqual(['Clementine Bauch']);
    });

    it('does not match the username or the email', () => {
        expect(getNames('Bret')).toEqual([]);
    });
});
