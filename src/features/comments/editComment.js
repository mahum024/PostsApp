import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {editComments , updateComment} from './commentSlice' 
import { Link } from 'react-router-dom';

const EditComment = () => {
  const comment= useSelector(state => state.comments)
  console.log(comment.comments.body)
  let {postId, id} = useParams();
  
  const [values, setValues] = useState({ email: "", body: "", name: "", id: null, postId: null});
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editData, setEditData] = useState(true);
  useEffect(() => {
    console.log(comment)
    dispatch(editComments({id, postId}));
    values.email = comment.comments.email;
    values.body = comment.comments.body;
    values.name = comment.comments.name;
    values.id = comment.comments.id;
    values.postId = comment.comments.postId;

  }, [])

  const { email, body , name} = values;
  const handleUpdate = () => {
    dispatch(updateComment({values}));
    setEditData(false)
   
  };

  const showCreatedPostBtn = () => {
    return (
      <>
        {editData ? (
             <div>
             <h1 >Edit Comment </h1>
             <form action="">
               <div> <label htmlFor="floatingTextarea">Name</label></div>
               <div>
                 <input
                   type="text"
                   value={name}
                   onChange={(e) => setValues({ ...values, name: e.target.value })}
                   placeholder="Enter Post Title"
                   className="form-control"
                   aria-describedby="emailHelp"
                 />
               </div>
               <div> <label htmlFor="floatingTextarea">Email</label></div>
               <div className="form-floating">
                 <textarea
                   className="form-control"
                   value={email}
                   onChange={(e) => setValues({ ...values, email: e.target.value })}
                   placeholder="add post description"
                 />
                
               </div>
               <div> <label htmlFor="floatingTextarea">Body</label></div>
               <div className="form-floating">
                 <textarea
                   className="form-control"
                   value={body}
                   onChange={(e) => setValues({ ...values, body: e.target.value })}
                   placeholder="add post description"
                 />
                
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

export default EditComment;

