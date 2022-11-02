import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSinglePost } from './postData'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const SinglePostDetail = () => {
 
  let { id } = useParams();
  const post = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSinglePost(id))
  }, [])


  return (
   <div>
    <div>
      <h2>Post Detail</h2>
        {post.loading && <div>Loading...</div>}
        {!post.loading && post.error ? <div>Error: {post.error}</div> : null}
        {!post.loading ? (
          <ul>
            <h1>Post ID: {post.post.id}</h1>
             Post Title  {post.post.title}
             Post Body {post.post.body}
            <div>
              <button type="button" className="btn btn-primary Data"><Link to = {`/post/${post.post.id}/comments`} >{'Show Comments'}</Link></button>
              <button type="button" className="btn btn-primary Data"><Link to = {`/post/edit/${post.post.id}`} >{'Edit post'}</Link></button>
            </div>
          </ul>
        ) : null}
    </div>
   </div>
  )
}

