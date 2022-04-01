import React, { useState, useEffect, useCallback, } from 'react';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';
import '../PostForm/PostForm.css';
import { checkError } from '../../utils';
import { TextInput, Textarea, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import { connect } from 'react-redux';
import { showNotification } from '@mantine/notifications';

export const ProfileForm = (props) => {
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

  })


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




  //UPLOAD IMAGE TO IMGUR AND UPDATES USER AVATAR
  const updateAvatar = async () => {
    let fieldsArr = Object.entries(postData);
    let error = "";
    seterrorMsg("");



    // VALIDATE INPUT ERRORS
    //File validation
    if (fileData == "") {
      seterrorMsg("Please upload an image")
      fileError = true;
    } else {
      seterrorMsg("")
      fileError = false;
    }



    //Policy checkbox validation
    if (!checked) {
      seterrorMsg("Please confirm you are 18 or older to submit")
      ageError = true;
    } else {
      seterrorMsg("")
      ageError = false;
    }


    if (!fileError && !ageError) {

      let config = {
        headers: { Authorization: `Bearer 272bb9d6b58b6ee89263edb23a760ce0dbf6a856` }
      }
      let imgbody = {
        image: fileData
      }
      imgURL = await axios.post('https://api.imgur.com/3/image', imgbody, config)


      console.log(props.credentials)
      let body = {
        "id": props.credentials.user[0]._id,
        // avatar: "https://i.imgur.com/wl1HPGG.png",
        avatar: imgURL.data.data.link,

      }
      let result;


      result = await axios.put("https://socialmeme.herokuapp.com/users/updateAvatar", body)
        .then(() => {
          setTimeout(() => {
            showNotification({
              title: `${props.credentials.user[0].nickname}, your avatar has been updated`,
              // message: 'Hey there, your code is awesome! 🤥',
              autoClose: 3000
            })
            setTimeout(() => {
              clearHooks();
            }, 5000)
          }, 1500)
        });

    }
  }



  const clearHooks = () => {

    setFileData("");

    setChecked(false);
  }

  return (
    <>
      <div className='createPost_box_form'>

        <>
          <div className='dropzoneContainer'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <p>Drop your meme image or gif here ...</p>
            </div>
          </div>
        </>

        <Checkbox
          mt="md"
          label="Confirm I accept the policies"
          required
          name="confirm"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />

        <Button className='submitBttn' type="submit" onClick={() => { updateAvatar() }}>Submit</Button>
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
}))(ProfileForm);