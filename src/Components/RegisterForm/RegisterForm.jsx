import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import { checkError } from '../../utils';
import { TextInput, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';

export const RegisterForm = (props) => {
  let navigate = useNavigate();
  let regexError;
  let passLengthError;
  let passMisError;
  let ageError;

  //1-Hooks
  const [userData, setuserData] = useState({
    nickname: "",
    email: "",
    password: "",
    password2: "",
    // avatar:,
  });
  const [msgLength, setMsgLength] = useState("");
  const [msgMis, setMsgMis] = useState("");
  const [errorMsg, seterrorMsg] = useState("");


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
    setuserData({ ...userData, [e.target.name]: e.target.value })

    //Check password min length
    if (e.target.name == "password" && e.target.value.length < 4) {
      return (setMsgLength("Password must be 4 characters min"))
    } else {
      setMsgLength("");
    }

    //Check password max length
    if ((e.target.name == "password" && e.target.value.length > 10) || (e.target.name == "password2" && e.target.value.length > 10)) {
      return (setMsgLength("Password must be 10 characters max"))
    } else {
      setMsgLength("");
    }

    //Check passwords mismatching

    if (e.target.name == "password" && e.target.value !== userData.password2) {
      return (setMsgMis("Passwords must match"))
    } else if (e.target.name == "password2" && e.target.value !== userData.password) {
      return (setMsgMis("Passwords must match"))
    } else {
      return (setMsgMis(""))
    }



  }



  const register = async () => {

    let fieldsArr = Object.entries(userData);
    let error = "";
    seterrorMsg("");

    //Inputs regex validation
    for (let element of fieldsArr) {
      error = checkError(element[0], element[1]);
      if (error !== "ok") {
        seterrorMsg(error)
        regexError = true;
        return
      }
    }
    if (error == "ok") {
      seterrorMsg("")
      regexError = false;
    }


    //Password mismatch validation
    if (userData.password !== userData.password2) {
      seterrorMsg("Passwords must match")
      passMisError = true;
    } else {
      if (seterrorMsg == "") {
        seterrorMsg("")
        passMisError = false;
      }

    }

    //Password length validation
    if ((userData.password.length < 4) || (userData.password.length > 10)) {
      seterrorMsg("Password must be between 4 and 10 characters")
      passLengthError = true;
    } else {
      if (seterrorMsg == "") {
        seterrorMsg("")
        passLengthError = false;
      }

    }

    if (!checked) {
      seterrorMsg("Please confirm you are 18 or older to submit")
      ageError = true;
    } else {
      seterrorMsg("")
      ageError = false;
    }

    let body = {
      nickname: userData.nickname,
      email: userData.email,
      password: userData.password,
      rating: [],
      avatar: "",
      followed: []
    }
    let result;
    if (!regexError && !passMisError && !passLengthError && !ageError) {
      try {

        result = await axios.post("https://socialmeme.herokuapp.com/users/register", body)

        if (result.data != "The user with that email/nickname already figures in the database") {
          setTimeout(() => {
            setMsgLength(result.data)


            setTimeout(() => {
              clearHooks();
            }, 5000)
          }, 1500)
        } else {

          seterrorMsg(result.data)
        }



      } catch (error) {
        console.log("Register error", error)
      }
    }
  }

  const clearHooks = () => {
    setuserData({
      nickname: "",
      email: "",
      password: "",
      password2: "",
      // avatar:,
    })

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
        label="Nickname"
        placeholder=""
        onChange={(e) => { fillForm(e) }}
        name="nickname"
        value={userData.nickname}
      />
      <TextInput
        required
        label="Email"
        placeholder="your@email.com"
        onChange={(e) => { fillForm(e) }}
        name="email"
        value={userData.email}
      />
      <TextInput
        required
        label="Password"
        type="password"
        placeholder="4 characters min"
        onChange={(e) => { fillForm(e) }}
        name="password"
        value={userData.password}
      />

      <TextInput
        required
        label="Repeat your password"
        type="password"
        placeholder="4 characters min"
        onChange={(e) => { fillForm(e) }}
        name="password2"
        value={userData.password2}
      />

      <Checkbox
        mt="md"
        label="Confirm that I am 18 or older"
        required
        name="confirm"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />

      <Button className='submitBttn' type="submit" onClick={() => register()}>Submit</Button>
      <br></br>
      <span className='errorMsg'>{errorMsg}</span>
      <br></br>
      <span className='okMsg'>{msgLength}</span>
      <br></br>
      <span className='okMsg'>{msgMis}</span>
    </>
  )
}
export default RegisterForm;