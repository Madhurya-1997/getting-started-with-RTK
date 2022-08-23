import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postsAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { sub } from 'date-fns'

const AddPostForm = () => {
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    const dispatch = useDispatch();

    const onAddPost = (e) => {
        e.preventDefault();
        if (title && content) {
            dispatch(postsAdded(title, content, userId))
            setTitle('');
            setContent('');
        }

    }

    const userOptions = users.map(user => <option key={user.id} value={user.id}>{user.name}</option>);

    return (
        <section>
            <h2>Add new Post</h2>

            <form>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)} />

                <label htmlFor='content'>Content</label>
                <textarea
                    id='content'
                    name='content'
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)} />
                <label htmlFor='postAuthor'>Author</label>
                <select id='postAuthor' value={userId} onChange={e => setUserId(e.target.value)}>
                    {userOptions}
                </select>

                <button onClick={onAddPost}>Add</button>
            </form>
        </section>

    )
}

export default AddPostForm
