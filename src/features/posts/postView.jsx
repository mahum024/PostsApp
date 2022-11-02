import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, fetchPosts } from './postSlice'
import { Link } from 'react-router-dom';
import CreatePost from './createPost';

export const PostView = () => {

  const dispatch = useDispatch()
  const [showCreateBtn, setShowCreateBtn] = useState(true);

  const post = useSelector(state => state.posts)

  const handleDelete = (id) => {
    dispatch(deletePost({ id: id}))
  }

  const handleCreate = () => {
    setShowCreateBtn(false)
  }

  const handleSubmit = () => {
    setShowCreateBtn(true)
  }

  const showCreatedPostBtn = () => {
    return (
      <>
        {showCreateBtn ? (
            <div> <button type="button" className="btn btn-primary Data" onClick={ handleCreate}>{'Create POst'}</button> </div>
        ) : (
        <CreatePost submit={handleSubmit}/>
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <>
      <div className='CreatePost'>{showCreatedPostBtn()}</div>
      <div>
        <h2>List of Posts</h2>
        {post.loading && <div>Loading...</div>}
        {!post.loading && post.error ? <div>Error: {post.error}</div> : null}
        {!post.loading && post.posts.length ? (
          <ul>
            {post.posts.map(post => (
                <li key={post.id}>
                <h1>ID {post.id} </h1> 
                <div>USER ID {post.userId}  </div>
                <div>Post Title {post.title} </div>
                <div>Post Body {post.body}  </div>
                <button type="button" className="btn btn-primary Data"><Link to = {`/post/${post.id}`} >{'Show Project Details'}</Link></button>
                <button type="button" className="btn btn-primary Data" onClick={ ()=> handleDelete(post.id)}>{'Delete posts'}</button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
}
