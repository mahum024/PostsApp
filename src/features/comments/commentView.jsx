import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchComments } from './commentSlice';
import {deleteComment} from './commentSlice'
import CreateComments from './createComments';
import { Link } from 'react-router-dom';
export const CommentView = () => {
  let { id } = useParams();
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchComments(id))
  }, [])
  
  const handleCreate = () => {
    setShowCreateBtn(false)
  }
  const handleSubmit = () => {
    setShowCreateBtn(true)
  }
  const handleDelete = (id) => {
   
    dispatch(deleteComment({id}));
    
  };

  const showCreatedPostBtn = () => {
    return (
      <>
        {showCreateBtn ? (
            <div> <button type="button" className="btn btn-primary Data" onClick={ handleCreate}>{'Create Comment'}</button> </div>
        ) : (
         <CreateComments submit={handleSubmit}/>
        )}
      </>
    );
  };

  return (
    <div>
      <div className='CreatePost'>{showCreatedPostBtn()}</div>
     
      <h2>Comments</h2>
      {comments.loading && <div>Loading...</div>}
      {!comments.loading && comments.error ? <div>Error: {comments.error}</div> : null}
      {!comments.loading && comments.comments.length ? (
        <ul>
          {comments.comments.map(comments => (
            <li key={comments.id}>
              <h1>ID {comments.id}</h1>
              <p>BODY {comments.body}</p>
              <p>NAME {comments.name}</p>
              <p>POST ID{comments.postId}</p>
              <p>EMAIL {comments.email}</p>
           
            <button type="button" className="btn btn-primary Data"><Link to = {`/post/${comments.postId}/comments/edit/${comments.id}`} >{'Edit post'}</Link></button>
            <button onClick= { ()=> handleDelete(comments.id)}>delete</button></li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
