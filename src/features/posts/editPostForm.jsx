import { findNonSerializableValue } from "@reduxjs/toolkit";
import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { editPost, updatePost} from './postData'
import { Link } from 'react-router-dom';

const EditPostForm = () => {
  const post = useSelector(state => state.post)
  let { id } = useParams();
  const [values, setValues] = useState({ title: "", body: "", userId: null, id: null});
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editData, setEditData] = useState(true);
  useEffect(() => {
    dispatch(editPost(id));
    values.body = post.post.body;
    values.title = post.post.title;
    values.userId = post.post.userId;
    values.id = post.post.id;
  }, [])

  const handleUpdate = () => {
    dispatch(updatePost({values}));
    setEditData(false)
   
  };

  const showCreatedPostBtn = () => {
    return (
      <>
        {editData ? (
             <div>
             <h1 >Edit Post </h1>
             <form action="">
               <div>
                 <input
                   type="text"
                   value={title}
                   onChange={(e) => setValues({ ...values, title: e.target.value })}
                   placeholder="Enter Post Title"
                   className="form-control"
                   aria-describedby="emailHelp"
                 />
               </div>
               <div className="form-floating">
                 <textarea
                   className="form-control"
                   value={body}
                   onChange={(e) => setValues({ ...values, body: e.target.value })}
                   placeholder="add post description"
                 />
                 <label htmlFor="floatingTextarea">add post description</label>
               </div>
               <div className="mt-4 d-flex align-items-end justify-content-end">
                 <button className="btn btn-primary" onClick={() => navigate("/")}>
                   Go Home
                 </button>
                 <button
                   className="btn btn-danger ms-4"
                   type="submit"
                   onClick= { handleUpdate }
                 >
                   submit
                 </button>
               </div>
             </form>
            </div>
        ) : (
        <div>
          <h1> ID {values.id}</h1>
            <h1>Title {values.title}</h1>
            <h1>Body {values.body}</h1>
            <h1>User Id{values.userId}</h1>
            <button type="button" className="btn btn-primary Data"><Link to = {`/`} >{'Back to home'}</Link></button>
        </div>
        )}
      </>
    );
  };

  
 return (
   <div>
   {showCreatedPostBtn()}
   </div>
  );
};

export default EditPostForm;