import { useSelector } from "react-redux";
import React from 'react';
import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reaction from "./Reaction";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts.slice().sort((a, b) => b.now.localeCompare(a.now));

    return (
        <section>
            <h2>Posts</h2>
            {orderedPosts.map((post) => {
                return (
                    <article key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content.substring(0, 100)}</p>
                        <div className="postCredit">
                            <PostAuthor userId={post.userId} />
                            <TimeAgo timestamp={post.now} />
                            <Reaction post={post} />
                        </div>

                    </article>
                )

            })}
        </section >
    )
}

export default PostsList