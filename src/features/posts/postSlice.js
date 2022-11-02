import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  posts: [],
  error: ''
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.data)
})

export const deletePost = createAsyncThunk('post/deletePost', (id) => {
 
  try {
    return axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => id)
  } catch (error) {
    alert(error)
  }
})

// export const createPost = createAsyncThunk('posts/createPost', ({values}) => {
  
//  return axios
//  .post(`https://jsonplaceholder.typicode.com/posts`, values)
//   .then(response => response.data)
//   .catch(function (error) {
//     console.log(error);
//   });

// })


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost : (state, action) => {
      var data = action.payload.values
      state.loading = false
      state.posts.push(data);
      state.error = ''
      console.log(data)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload;
      state.error = ''
     
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false
      state.posts = []
      state.error = action.error.message
    })

    builder.addCase(deletePost.pending, state => {
      state.loading = true
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false
      state.posts.splice(state.posts.findIndex(item => item.id === action.payload.id), 1);
      state.error = ''
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false
      state.posts= []
      state.error = action.error.message
    })


    // builder.addCase(createPost.pending, state => {
    //   state.loading = true
      
    // })
    // builder.addCase(createPost.fulfilled, (state, action) => {
    //   console.log(action.payload.id)
    //   state.loading = false
    //   var data = {id: action.payload.id, title: action.payload.title, body: action.payload.body, userId:action.payload.userId };
    //   state.posts.push(data);
    //   state.error = ''
    // })
    // builder.addCase(createPost.rejected, (state, action) => {
    //   state.loading = false
    //   state.posts= []
    //   state.error = action.error.message
    // })

  }
})

export default postSlice.reducer
export const { createPost } = postSlice.actions