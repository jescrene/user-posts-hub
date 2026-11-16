import Skeleton from '@mui/material/Skeleton';

import { useUiTexts } from '@/hooks/useUiTexts';

import { USERS_LOADING_TEST_ID } from '../../constants/usersPanelTestIds';
import { usersPanelUiTexts } from '../../constants/usersPanelUiTexts';
import { SSkeletonRow, SSkeletonText } from './styled';

const ROWS = [1, 2, 3, 4, 5, 6];

/**
 * Loading state of the users list: placeholder rows with the shape of the user items, so the
 * layout does not jump when the users arrive.
 * Used by {@link UsersPanelBody}.
 */
const UserListSkeleton = () => {
    const texts = useUiTexts(usersPanelUiTexts);

    return (
        <div
            aria-busy
            aria-label={texts.loadingLabel}
            data-testid={USERS_LOADING_TEST_ID}
            role="progressbar"
        >
            {ROWS.map((row) => (
                <SSkeletonRow key={row}>
                    <Skeleton height={40} variant="circular" width={40} />
                    <SSkeletonText>
                        <Skeleton width="60%" />
                        <Skeleton width="85%" />
                    </SSkeletonText>
                </SSkeletonRow>
            ))}
        </div>
    );
};

export default UserListSkeleton;
