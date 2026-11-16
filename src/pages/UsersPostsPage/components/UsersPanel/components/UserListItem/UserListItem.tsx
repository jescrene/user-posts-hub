import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import type { User } from '@/types/user';
import { getAvatarColor, getInitials } from '@/utils/avatar';

import { USER_LIST_ITEM_TEST_ID } from '../../constants/usersPanelTestIds';
import { getUserSecondaryText } from '../../constants/usersPanelUiTexts';
import { SUserAvatar, SUserButton } from './styled';

interface UserListItemProps {
    /** User shown in the row. */
    user: User;
    /** Whether the row is the selected user. */
    selected: boolean;
    /** Receives the user when the row is clicked. */
    onSelect: (user: User) => void;
}

/**
 * Row of the users list: a button with the avatar, the name and the handle and email of a user.
 * Used by {@link UserList}.
 */
const UserListItem = ({ onSelect, selected, user }: UserListItemProps) => (
    <ListItem data-testid={USER_LIST_ITEM_TEST_ID} disablePadding>
        <SUserButton
            aria-current={selected || undefined}
            onClick={() => onSelect(user)}
            selected={selected}
        >
            <ListItemAvatar>
                <SUserAvatar aria-hidden sx={{ bgcolor: getAvatarColor(user.id) }}>
                    {getInitials(user.name)}
                </SUserAvatar>
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={getUserSecondaryText(user.username, user.email)}
                slotProps={{ primary: { noWrap: true }, secondary: { noWrap: true } }}
            />
        </SUserButton>
    </ListItem>
);

export default UserListItem;
