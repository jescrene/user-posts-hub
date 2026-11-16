import { describe, expect, it } from 'vitest';

import { AVATAR_COLORS } from '@/theme/avatarColors';
import { getAvatarColor, getInitials } from '@/utils/avatar';

describe('getInitials', () => {
    it.each([
        ['Leanne Graham', 'LG'],
        ['Mrs. Dennis Schulist', 'DS'],
        ['Nicholas Runolfsdottir V', 'NR'],
        ['clementina DuBuque', 'CD'],
        ['Bret', 'B'],
    ])('returns the initials of "%s"', (name, initials) => {
        expect(getInitials(name)).toBe(initials);
    });
});

describe('getAvatarColor', () => {
    it('returns the same color for the same user', () => {
        expect(getAvatarColor(3)).toBe(getAvatarColor(3));
        expect(getAvatarColor(1 + AVATAR_COLORS.length)).toBe(getAvatarColor(1));
    });
});
