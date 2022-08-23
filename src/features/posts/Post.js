import React from 'react'
import PostAuthor from './PostAuthor'
import Reaction from './Reaction'
import TimeAgo from './TimeAgo'

const Post = ({ post }) => {
    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <div className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.now} />
            </div>
            <Reaction post={post} />

        </article>
    )
}

export default Post