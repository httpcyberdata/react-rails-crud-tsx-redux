import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import { RootState } from '../../app/store';
import { fetchPosts } from './postAPI';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = "Loading...",
  UpToDate = "Up to Date",
  Deleted = "Deleted",
  Error = "Error"
}

export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostsState {
  posts: PostState[];
  status: string;
}


const initialState: PostsState = {
  posts: [
    {
    id: 0,
    title: "",
    body: "I am here.",
    created_at: "",
    updated_at: "",
    }
  ],
  status: Status.Initial
}

export const fetchPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
      const response = await fetchPosts();
      return response;
    }
  )

export const postSlice = createSlice({
  name: 'posts',
  initialState, 
  reducers: {}, 
  extraReducers: (builder) => {
    builder
        .addCase(fetchPostsAsync.pending, (state) => {
          return produce(state, (draftState) => {
            draftState.status = Statuses.Loading;
          })
        })        
        .addCase(fetchPostsAsync.fulfilled (state) => {
          return produce(state, (draftState) => {
              draftState.status = Statuses.UpToDate;
          })
        })        
         .addCase(fetchPostsAsync.error, (state) => {
          return produce(state, (draftState) => {
            draftState.status = Statuses.Error;
          })
        })
    }
})

export const {  } = postSlice.actions;
export const selectPosts = ( state: RootState ) => state.posts.posts;
export const selectStatus = (state: RootState ) => state.posts.status;

export default postSlice.reducer;