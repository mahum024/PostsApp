import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from './postSlice'
import uuid from 'react-uuid';

const CreatePost = (props) => {
  const [values, setValues] = useState({ title: "", body: "", userId: uuid(), id: uuid()});
  const { title, body,  userId } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({values}));
    setValues({ title: "", body: "", userId: uuid(), id: uuid() });
    navigate('/')
    props.submit()
  };
  
 return (
    <div className="Form">
      <h1 >Create Post </h1>
      <form action="">
        <div>
          <input type="text" value={title} onChange={(e) => setValues({ ...values, title: e.target.value })} placeholder="Enter Post Title" />
        </div>
       
        <div >
          <textarea value={body} onChange={(e) => setValues({ ...values, body: e.target.value })} placeholder="add post description" />
        </div>

        <div>
          <button type="submit" onClick= { handleSubmit} >submit </button>
        </div>
      </form>
     </div>
  );
};

export default CreatePost;