import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_API = 'https://jsonplaceholder.typicode.com/posts';

const INITIAL_STATE = {
    posts: [],
    status: 'idle', // 'idle' || 'success' || 'failed' || 'loading'
    error: null
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await axios.get(POST_API);
        return res.data
    } catch (err) {
        return err.message;
    }

})


const postsSlice = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {
        postsAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        now: sub(new Date(), {}).toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }

            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        console.log('Builder ', builder);
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log('Fulfilled ', action)
                state.status = 'success'
                let minute = 1;
                const loadedPosts = action.payload.map(post => {
                    post.now = sub(new Date(), { minutes: minute++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }

                    // replace 'body' key with 'content' in post object
                    post.content = post.body
                    Object.defineProperty(post, 'content',
                        Object.getOwnPropertyDescriptor(post, 'body'));
                    delete post.body;
                    return post;
                })
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log('Rejected ', action)
                state.status = 'failed'
                state.error = action.error.message;
            })
    }

})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;