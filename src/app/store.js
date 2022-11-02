import { configureStore } from '@reduxjs/toolkit'
import postData from '../features/posts/postData'
import postReducer from '../features/posts/postSlice'
import commentReducer from '../features/comments/commentSlice'

const store = configureStore({
  reducer: {
   
    posts: postReducer,
    post: postData,
    comments:  commentReducer
  }
})

export default store
