import { useSelector } from "react-redux";
import React from 'react';
import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import PostAuthor from "./PostAuthor";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const users = useSelector(selectAllUsers);

    return (
        <section>
            <h2>Posts</h2>
            {posts.map(({ id, title, content, userId }) => {
                return (
                    <article key={id}>
                        <h3>{title}</h3>
                        <p>{content.substring(0, 100)}</p>
                        <div className="postCredit">
                            <PostAuthor userId={userId} />
                        </div>

                    </article>
                )

            })}
        </section >
    )
}

export default PostsList