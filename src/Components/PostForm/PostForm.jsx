import React, { useState, useEffect, useCallback, } from 'react';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';
import './PostForm.css';
import { checkError } from '../../utils';
import { TextInput, Textarea, Checkbox, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import { connect } from 'react-redux';

export const PostForm = (props) => {
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
    title: "",
    description: "",
    keywords: ""
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
    clearHooks();
    console.log(fileData);
  }, [])


  //Handler function
  //Shows msgs while writting
  const fillForm = (e) => {
    //Set data
    setpostData({ ...postData, [e.target.name]: e.target.value })

  }


  //Dropzone functions
  const onDrop = useCallback(acceptedFiles => {

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => seterrorMsg('file reading was aborted')
      reader.onerror = () => seterrorMsg('file reading has failed')
      reader.onload = () => {

        setFileData(reader.result.split(',')[1])
      }

      reader.readAsDataURL(file);

    })

  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })





  //UPLOAD IMAGE TO IMGUR AND CREATES NEW POST IN DB
  const createPost = async () => {
    let fieldsArr = Object.entries(postData);
    let error = "";
    seterrorMsg("");



    //VALIDATE INPUT ERRORS
    //File validation
    if (fileData == "") {
      seterrorMsg("Please upload an image")
      fileError = true;
    } else {
      seterrorMsg("")
      fileError = false;
    }

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

    //Policy checkbox validation
    if (!checked) {
      seterrorMsg("Please confirm you are 18 or older to submit")
      ageError = true;
    } else {
      seterrorMsg("")
      ageError = false;
    }


    if (!fileError && !regexError && !passMisError && !passLengthError && !ageError) {

      let configImg = {
        headers: { Authorization: `Bearer 272bb9d6b58b6ee89263edb23a760ce0dbf6a856` }
      }
      let imgbody = {
        image: fileData
      }
      imgURL = await axios.post('https://api.imgur.com/3/image', imgbody, configImg)

      let keywordsArr = postData.keywords.split(",");

      console.log(props.credentials)
      let body = {
        ownerId: props.credentials.user[0]._id,
        ownerNickname: props.credentials.user[0].nickname,
        title: postData.title,
        // img: "https://i.imgur.com/wl1HPGG.png",
        img: imgURL.data.data.link,
        text: postData.description,
        keywords: keywordsArr
      }
      let result;


      result = await axios.post("https://socialmeme.herokuapp.com/posts/create", body, config)
        .then(() => {
          setTimeout(() => {
            showNotification({
              title: `Your post has been created succesfully}`,
              // message: 'Hey there, your code is awesome! 🤥',
              autoClose: 1000
            })
            setTimeout(() => {
              clearHooks();
            }, 5000)
          }, 1500)
        });

    }
  }



  const clearHooks = () => {
    setpostData({
      title: "",
      description: ""
    })

    setFileData("");

    setMsgLength("");
    setMsgMis("");
    seterrorMsg("");

    setChecked(false);
  }
  const enterPress = (e) => {
    if (e.key === "Enter") {
      createPost();
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

        <>
          <div className='dropzoneContainer'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <p>Drop your meme image or gif here ...</p>
            </div>
          </div>
        </>

        <TextInput
          required
          label="Title"
          placeholder=""
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
          placeholder="Description of the meme "
          onChange={(e) => { fillForm(e) }}
          name="description"
          value={postData.description}
          onKeyDown={(e) => { enterPress(e) }}
        />

        <TextInput
          required
          label="KeyWords"
          placeholder="separated by comma"
          onChange={(e) => { fillForm(e) }}
          name="keywords"
          value={postData.keywords}
          classNames={{
            input: 'field',
          }}
          onKeyDown={(e) => { enterPress(e) }}
        />


        <Checkbox
          mt="md"
          label="Confirm I accept the policies"
          required
          name="confirm"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}

        />

        <Button className='submitBttn' type="submit" onClick={() => { createPost() }}>Submit</Button>
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
  credentials: state.credentials
}))(PostForm);