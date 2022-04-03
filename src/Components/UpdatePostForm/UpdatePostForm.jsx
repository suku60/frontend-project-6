import React, { useState, useEffect, useCallback, } from 'react';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';
import './UpdatePostForm.css';
import { checkError } from '../../utils';
import { TextInput, Textarea, Checkbox, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import { connect } from 'react-redux';

export const UpdatePostForm = (props) => {
  let imgURL;
  let navigate = useNavigate();
  let regexError;
  let passLengthError;
  let passMisError;
  let ageError;
  let fileError;
  let config = {
    headers: { Authorization: `Bearer ${props.credentials.token}` }
  }


  //1-Hooks
  const [postData, setpostData] = useState({
    title: props.profileData.post.title,
    description: props.profileData.post.text,
    keywords: props.profileData.post.keywords.toString()

  });





  const [postSaved, setPostSaved] = useState([]);
  const [msgLength, setMsgLength] = useState("");
  const [msgMis, setMsgMis] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  //Image dropzone hook
  const [fileData, setFileData] = useState("")


  //Mantine hooks
  const [checked, setChecked] = useState(false);


  //Refs



  //useEffect
  //userData useEffect
  useEffect(() => {

  }, [])


  //Handler function
  //Shows msgs while writting
  const fillForm = (e) => {
    //Set data
    setpostData({ ...postData, [e.target.name]: e.target.value })

  }



  //UPDATE POST IN DB
  const updatePost = async () => {
    let fieldsArr = Object.entries(postData);
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


      let keywordsArr = postData.keywords.split(",");


      let body = {
        postId: props.profileData.post._id,
        title: postData.title,
        text: postData.description,
        keywords: keywordsArr
      }

     
      let result;


      result = await axios.put("https://socialmeme.herokuapp.com/posts/update", body, config)
        .then(() => {
          setTimeout(() => {
            showNotification({
              title: `The post has been updated}`,
              // message: 'Hey there, your code is awesome! 🤥',
              autoClose: 1000
            })
            setPostSaved(result.data);
            setTimeout(() => {
              clearHooks();
            }, 5000)
          }, 1500)
        });

    }
  }

  const deletePost = async () => {
  
    console.log("soy el objetivo",props.profileData.post._id);
    let result = await axios.delete(`https://socialmeme.herokuapp.com/posts/delete?postId=${props.profileData.post._id}`, config)
    .then(() => {
      setTimeout(() => {
        showNotification({
          title: `The post has been deleted}`,
          // message: 'Hey there, your code is awesome! 🤥',
          autoClose: 1000
        })
        setTimeout(() => {
          clearHooks();
        }, 5000)
      }, 1500)
    });
  }



  const clearHooks = () => {
    setpostData({
      title: "",
      description: "",
      keywords: ""
    })


    setMsgLength("");
    setMsgMis("");
    seterrorMsg("");

    setChecked(false);
  }
  const enterPress = (e) => {
    if (e.key === "Enter") {
      updatePost();
    }
  }
  return (
    <>
      <>
        {/* {<pre>{JSON.stringify(postData.keywords, null, 2)}</pre>} */}
        {/* {<pre>{JSON.stringify(checked, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgLength, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgMis, null, 2)}</pre>}
        {<pre>{JSON.stringify(errorMsg, null, 2)}</pre>} */}
      </>
      <div className='createPost_box_form'>

        <TextInput
          required
          label="Title"
          placeholder={postData.title}
          onChange={(e) => { fillForm(e) }}
          name="title"
          value={postData.title}
          classNames={{
            input: 'titleField',
          }}
          onKeyDown={(e) => { enterPress(e) }}
        />



        <Textarea
          required
          label="Description"
          placeholder={postData.description}
          onChange={(e) => { fillForm(e) }}
          name="description"
          value={postData.description}
          onKeyDown={(e) => { enterPress(e) }}
        />

        <TextInput
          required
          label="KeyWords"
          placeholder={postData.keywords}
          onChange={(e) => { fillForm(e) }}
          name="keywords"
          value={postData.keywords}
          classNames={{
            input: 'field',
          }}
          onKeyDown={(e) => { enterPress(e) }}
        />

        <div className='bttns_box'>
          <Button className='submitBttn' type="submit" onClick={() => { updatePost() }}>Update</Button>
          <Button className='deleteBttn' type="submit" onClick={() => { deletePost() }}>Delete</Button>
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
}))(UpdatePostForm);