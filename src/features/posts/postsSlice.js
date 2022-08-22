import { createSlice, nanoid } from "@reduxjs/toolkit";

const INITIAL_STATE = [

]


const postsSlice = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {
        postsAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }

                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const { postsAdded } = postsSlice.actions;

export default postsSlice.reducer;