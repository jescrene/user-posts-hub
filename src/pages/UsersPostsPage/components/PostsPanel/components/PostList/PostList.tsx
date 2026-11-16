import type { Post } from '@/types/post';

import { POST_LIST_TEST_ID } from '../../constants/postsPanelTestIds';
import PostCard from '../PostCard/PostCard';
import { SPostList } from './styled';

interface PostListProps {
    /** Posts to show, newest first. */
    posts: Post[];
}

/**
 * List of post cards. It only renders the posts it receives.
 * Used by {@link PostsPanel}.
 */
const PostList = ({ posts }: PostListProps) => (
    <SPostList data-testid={POST_LIST_TEST_ID}>
        {posts.map((post) => (
            <li key={post.id}>
                <PostCard post={post} />
            </li>
        ))}
    </SPostList>
);

export default PostList;
