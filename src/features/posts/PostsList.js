import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { selectAllPosts, fetchPosts, getPostsError, getPostsStatus } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import Post from "./Post";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    const dispatch = useDispatch();


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch])


    let content;

    if (status === 'loading') {
        content = <p>"Loading..."</p>
    } else if (status === 'success') {
        const orderedPosts = posts.slice().sort((a, b) => b.now.localeCompare(a.now));
        content = orderedPosts.map(post => <Post key={post.id} post={post} />)
    } else if (status === 'failed') {
        content = <p>{error}</p>
    }


    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section >
    )
}

export default PostsList