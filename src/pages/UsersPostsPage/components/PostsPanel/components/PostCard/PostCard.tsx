import Typography from '@mui/material/Typography';

import type { Post } from '@/types/post';

import { POST_CARD_TEST_ID } from '../../constants/postsPanelTestIds';
import { SPostCard } from './styled';

interface PostCardProps {
    /** Post shown in the card. */
    post: Post;
}

/**
 * Card with the title and the text of a post. The text keeps its line breaks.
 * Used by {@link PostList}.
 */
const PostCard = ({ post }: PostCardProps) => (
    <SPostCard data-testid={POST_CARD_TEST_ID}>
        <Typography component="h3" sx={{ fontWeight: 600, lineHeight: 1.4 }} variant="subtitle1">
            {post.title}
        </Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }} variant="body2">
            {post.body}
        </Typography>
    </SPostCard>
);

export default PostCard;
