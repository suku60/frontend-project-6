import React, { useState, useEffect, useCallback, } from 'react';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';
import './PostForm.css';
import { checkError } from '../../utils';
import { TextInput, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';

export const PostForm = (props) => {
  let imgURL;
  let navigate = useNavigate();
  let regexError;
  let passLengthError;
  let passMisError;
  let ageError;
  let fileError;

  //1-Hooks
  const [postData, setpostData] = useState({
    title: "",
    description: ""
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

  })


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

      let config = {
        headers: { Authorization: `Bearer 272bb9d6b58b6ee89263edb23a760ce0dbf6a856` }
      }
      let imgbody = {
        image: fileData
      }
      imgURL = await axios.post('https://api.imgur.com/3/image', imgbody, config)



      console.log("despues", imgURL);
      let body = {
        ownerId: "623a1a762be74bc5a33f6df5",
        ownerNickname: "JaviDaFacker",
        title: postData.title,
        img: imgURL.data.data.link,
        text: postData.description,
        keywords: ["prueba", "prueba2"]
      }
      let result;


      result = await axios.post("https://socialmeme.herokuapp.com/posts/create", body)
        .then(() => {
          setTimeout(() => {
            setMsgLength("The post has been created")
            setPostSaved(result.data);
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

  return (
    <>
      <>
        {/* {<pre>{JSON.stringify(userData, null, 2)}</pre>}
        {<pre>{JSON.stringify(checked, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgLength, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgMis, null, 2)}</pre>}
        {<pre>{JSON.stringify(errorMsg, null, 2)}</pre>} */}
      </>

      <TextInput
        required
        label="Title"
        placeholder=""
        onChange={(e) => { fillForm(e) }}
        name="title"
        value={postData.title}
      />

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
        label="Description"
        placeholder="Your description of the meme "
        onChange={(e) => { fillForm(e) }}
        name="description"
        value={postData.description}
      // onClick={uploadImage}
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
    </>
  )
}
export default PostForm;