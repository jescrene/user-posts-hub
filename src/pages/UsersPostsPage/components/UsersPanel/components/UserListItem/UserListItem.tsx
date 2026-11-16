import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import type { User } from '@/types/user';
import { getAvatarColor, getInitials } from '@/utils/avatar';

import { USER_LIST_ITEM_TEST_ID } from '../../constants/usersPanelTestIds';
import { getUserSecondaryText } from '../../constants/usersPanelUiTexts';
import { SUserAvatar } from './styled';

interface UserListItemProps {
    /** User shown in the row. */
    user: User;
}

/**
 * Row of the users list: the avatar, the name and the handle and email of a user.
 * Used by {@link UserList}.
 */
const UserListItem = ({ user }: UserListItemProps) => (
    <ListItem data-testid={USER_LIST_ITEM_TEST_ID} disableGutters>
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
    </ListItem>
);

export default UserListItem;
