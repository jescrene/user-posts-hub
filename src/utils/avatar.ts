import { AVATAR_COLORS } from '@/theme/avatarColors';

/**
 * @param name - Full name, e.g. "Leanne Graham".
 * @returns Up to two uppercase initials, e.g. "LG".
 */
export const getInitials = (name: string) =>
    name
        .split(/\s+/)
        .filter((word) => /^\p{L}/u.test(word))
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('');

/**
 * @param id - Id of the user.
 * @returns A background color that is always the same for the same user.
 */
export const getAvatarColor = (id: number) => AVATAR_COLORS[Math.abs(id) % AVATAR_COLORS.length];
