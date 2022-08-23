import React from 'react'
import { useSelector } from 'react-redux/es/exports';
import { selectAllUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const user = users.find(user => user.id === userId);

    return <span> by {user ? user.name : 'Unknown author'}</span>
}

export default PostAuthor