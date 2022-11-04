import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {editComments , updateComment} from './commentSlice' 
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Card, CardActions, CardContent, Typography } from '@mui/material'

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

            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
      
              <Typography component="h1" variant="h5">
                Edit Comment
              </Typography>
              <Box component="form" onSubmit="" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  type="text" value={name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Enter name" 

                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  type="text" value={email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="Enter email"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="body"
                  label="Body"
                  autoFocus
                  value={body} onChange={(e) => setValues({ ...values, body: e.target.value })} placeholder="add description"
                />
      
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick= {handleUpdate}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
      
              </Box>
            </Box>
            <Button
              type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
          </Container>
                      
        ) : (

        <Grid xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
         <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              ID {values.id}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Email : {values.email}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Body {values.body}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Name : {values.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Post Id : {values.postId}
            </Typography>
          </CardContent>
          <CardActions>
          <Button
              type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
          </CardActions>
        </Card>
      </Grid>
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

