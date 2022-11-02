import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  comments: [],
  error: ''
}

export const fetchComments = createAsyncThunk('user/fetchComments', (id) => {
 
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => response.data)
})

export const editComments = createAsyncThunk('comments/editComments', (id) => {
  
  return axios
  .get(`https://jsonplaceholder.typicode.com/posts/1/comments`)
    .then( response => response.data)
 
 })

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment : (state, action) => {
      var data = action.payload.values
      state.loading = false
      state.comments.push(data);
      state.error = ''
    },
    deleteComment : (state, action) => {
      state.loading = false
      state.comments.splice(state.comments.findIndex(item => item.id === action.payload.id), 1);
      state.error = ''
    },

    updateComment : (state, action) => {
     
      var data = {id: action.payload.id, name: action.payload.name, email: action.payload.email, body:action.payload.body,  postId: action.payload.postId};
      state.loading = false
      state.post = data
      console.log(data)
      state.error = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false
      state.comments = action.payload
      state.error = ''
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false
      state.comments = []
      state.error = action.error.message
    })


    builder.addCase(editComments.pending, state => {
     
      state.loading = true
    })
    builder.addCase(editComments.fulfilled, (state, action) => {
      
      state.loading = false
      state.comments = action.payload
      let data = state.comments.findIndex(item => item.id == action.meta.arg.id)
      state.comments = state.comments[data]
      state.error = ''
    })
    builder.addCase(editComments.rejected, (state, action) => {
      state.loading = false
      state.comments = []
      state.error = action.error.message
    })

  }
})

export default commentSlice.reducer
export const { deleteComment, createComment, updateComment } = commentSlice.actions
