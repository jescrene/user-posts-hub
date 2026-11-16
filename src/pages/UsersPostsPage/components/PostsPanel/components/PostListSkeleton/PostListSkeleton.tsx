import Skeleton from '@mui/material/Skeleton';

import { useUiTexts } from '@/hooks/useUiTexts';

import { POSTS_LOADING_TEST_ID } from '../../constants/postsPanelTestIds';
import { postsPanelUiTexts } from '../../constants/postsPanelUiTexts';
import { SPostCard } from '../PostCard/styled';
import { SPostList } from '../PostList/styled';

const CARDS = [1, 2, 3];

/**
 * Loading state of the posts: placeholder cards with the shape of the post cards, reusing their
 * styles so the layout does not jump when the posts arrive.
 * Used by {@link PostsPanelBody}.
 */
const PostListSkeleton = () => {
    const texts = useUiTexts(postsPanelUiTexts);

    return (
        <SPostList
            aria-busy
            aria-label={texts.loadingLabel}
            data-testid={POSTS_LOADING_TEST_ID}
            role="progressbar"
        >
            {CARDS.map((card) => (
                <li key={card}>
                    <SPostCard>
                        <Skeleton height={28} width="70%" />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton width="40%" />
                    </SPostCard>
                </li>
            ))}
        </SPostList>
    );
};

export default PostListSkeleton;
