import React from 'react'
import PageNotFound from './errors/PageNotFound.js';
import  {PostView } from '../../features/posts/postView'
import { SinglePostDetail } from '../../features/posts/singlePostDetail.jsx';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import EditComment from '../../features/comments/editComment.js';
import { CommentView } from '../../features/comments/commentView.jsx';
import EditPostForm from '../../features/posts/editPostForm.jsx';
import CreatePost from '../../features/posts/createPost.js';

const Paths = () => 
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<PostView/>}/>
            <Route path="/post/:id" element={< SinglePostDetail/>} />
            <Route path="/post/edit/:id" element={< EditPostForm/>} />
            <Route path="/post/:id/comments" element={<CommentView/>}/>
            <Route path= "/comments?postId=:id" element={<CommentView/>}/>
            <Route path= "/createPost" element={<CreatePost/>}/>
            <Route path = "/post/:postId/comments/edit/:id" element={<EditComment/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>

export default Paths


