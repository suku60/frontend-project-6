import React, { useState, useEffect, useCallback, } from 'react';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';
import './UpdateCommentForm.css';
import { checkError } from '../../utils';
import { TextInput, Textarea, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import { connect } from 'react-redux';

export const UpdateCommentForm = (props) => {
  let imgURL;
  let navigate = useNavigate();
  let regexError;
  let passLengthError;
  let passMisError;
  let ageError;
  let fileError;


  //1-Hooks
  const [commentData, setCommentData] = useState({
    comment: props.profileData.comment.comment
  });





  const [postSaved, setPostSaved] = useState([]);
  const [msgLength, setMsgLength] = useState("");
  const [msgMis, setMsgMis] = useState("");
  const [errorMsg, seterrorMsg] = useState("");



  //Refs



  //useEffect
  //userData useEffect
  useEffect(() => {
// console.log("PROPS",props.profileData.comment);
  }, [])


  //Handler function
  //Shows msgs while writting
  const fillForm = (e) => {
    //Set data
    setCommentData({ ...commentData, [e.target.name]: e.target.value })

  }



  //UPDATE POST IN DB
  const updateComment = async () => {
    let fieldsArr = Object.entries(commentData);
    let error = "";
    seterrorMsg("");




    //Inputs regex validation
    for (let element of fieldsArr) {

      error = checkError(element[0], element[1]);
      console.log(error)
      if (error !== "ok") {
        seterrorMsg(error)
        regexError = true;
        return
      } else if (error == "ok") {
        seterrorMsg("")
        regexError = false;
      }
    }



    if (!regexError && !passMisError && !passLengthError && !ageError) {




      let body = {
        postId: props.profileData.comment.postId,
        commentId: props.profileData.comment.commentId,
        comment: commentData.comment
      }
      let result;


      result = await axios.put("https://socialmeme.herokuapp.com/posts/actions/updateComment", body)
        .then(() => {
          setTimeout(() => {
            setMsgLength("The comment has been updated")
            // setPostSaved(result.data);
            setTimeout(() => {
              clearHooks();
            }, 5000)
          }, 1500)
        });

    }
  }

  const deleteComment = async () => {
    let body = {
      postId: props.profileData.comment.postId,
      commentId: props.profileData.comment.commentId
    }

    let result = await axios.put(`https://socialmeme.herokuapp.com/posts/actions/deleteComment`, body)

    .then(() => {
      setTimeout(() => {
        setMsgLength("The comment has been deleted")
        setTimeout(() => {
          clearHooks();
        }, 5000)
      }, 1500)
    });
  }



  const clearHooks = () => {
    setCommentData({
      comment: ""
    })


    setMsgLength("");
    setMsgMis("");
    seterrorMsg("");
  }

  return (
    <>
      <>
        {/* {<pre>{JSON.stringify(commentData.comment, null, 2)}</pre>} */}
        {/* {<pre>{JSON.stringify(checked, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgLength, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgMis, null, 2)}</pre>}
        {<pre>{JSON.stringify(errorMsg, null, 2)}</pre>} */}
      </>
      <div className='createPost_box_form'>


         <Textarea
          required
          label="Comment"
          placeholder={commentData.comment}
          onChange={(e) => { fillForm(e) }}
          name="comment"
          value={commentData.comment}

        />

        <div className='bttns_box'>
          <Button className='submitBttn' type="submit" onClick={() => { updateComment() }}>Update</Button>
          <Button className='deleteBttn' type="submit" onClick={() => { deleteComment() }}>Delete</Button>
        </div>

        <br></br>
        <span className='errorMsg'>{errorMsg}</span>
        <br></br>
        <span className='okMsg'>{msgLength}</span>
        <br></br>
        <span className='okMsg'>{msgMis}</span>
      </div>
    </>
  )
}
export default connect((state) => ({
  credentials: state.credentials,
  profileData: state.profileData,
}))(UpdateCommentForm);