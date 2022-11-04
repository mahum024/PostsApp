import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  post: [],
  error: ''
}

export const fetchSinglePost = createAsyncThunk('post/fetchSinglePost', (id) => {
  
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.data)
})


export const editPost = createAsyncThunk('posts/editPost', (id) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.data)
 
 })

 export const updatePost = createAsyncThunk('posts/updatePost', ({values}) => {
 
  return axios
  .patch(`https://jsonplaceholder.typicode.com/posts/${1}`,values )
  .then(response => response.data)
 
 })

const postData = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSinglePost.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
      state.loading = false
      state.post = action.payload
      state.error = ''
    })
    builder.addCase(fetchSinglePost.rejected, (state, action) => {
      state.loading = false
      state.post = []
      state.error = action.error.message
    })

    builder.addCase(editPost.pending, state => {
      state.loading = true
    })
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false
      state.post = action.payload
      state.error = ''
    })
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = false
      state.post = []
      state.error = action.error.message
    })


    builder.addCase(updatePost.pending, state => {
      state.loading = true
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      var data = {id: action.payload.id, title: action.payload.title, body: action.payload.body, userId:action.payload.userId };
      
      state.loading = false
      state.post = data
      console.log(data)
      state.error = ''
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false
      state.post = []
      state.error = action.error.message
    })
  }
})

export default postData.reducer
