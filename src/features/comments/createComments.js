import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {createComment} from './commentSlice'
import uuid from 'react-uuid';

const CreateComments = (props) => {
  const [values, setValues] = useState({ name: "", body: "", email:"", id: uuid()});
  const { body, name, email } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({values}));
    setValues({ name: "",email:"", body: "", id: uuid() });
    props.submit()
  };
  
 return (
    <div className="Form">
      <h1 >Create Comments </h1>
      <form action="">
        <div>
          <input type="text" value={name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Enter name" />
        </div>

        <div>
          <input type="text" value={email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="Enter email" />
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

export default CreateComments;
