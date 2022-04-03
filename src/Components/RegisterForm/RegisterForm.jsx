import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import { checkError } from '../../utils';
import { TextInput, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

export const RegisterForm = (props) => {
  let navigate = useNavigate();
  let regexError;
  let nickLengthError;
  let passLengthError;
  let passMisError;
  let ageError;

  // HOOKS
  // user data
  const [userData, setuserData] = useState({
    nickname: "",
    email: "",
    password: "",
    password2: "",
    // avatar:,
  });
  // messages
  const [msgLength, setMsgLength] = useState("");
  const [msgMis, setMsgMis] = useState("");
  const [errorMsg, seterrorMsg] = useState("");


  // Mantine hooks
  const [checked, setChecked] = useState(false);


  // Refs

  // useEffect
  // userData useEffect
  useEffect(() => {

  })


  // Handlers
  // Shows msgs while writting
  const fillForm = (e) => {
    // Set data
    setuserData({ ...userData, [e.target.name]: e.target.value })

    // Check password min length
    if (e.target.name == "password" && e.target.value.length < 4) {
      return (setMsgLength("Password must be 4 characters min"))
    } else {
      setMsgLength("");
    }

    // Check password max length
    if ((e.target.name == "password" && e.target.value.length > 10) || (e.target.name == "password2" && e.target.value.length > 10)) {
      return (setMsgLength("Password must be 10 characters max"))
    } else {
      setMsgLength("");
    }

    // Check passwords mismatching

    if (e.target.name == "password" && e.target.value !== userData.password2) {
      return (
        // setMsgMis("Passwords must match")
        showNotification({
          title: "Passwords must match",
          autoClose: 1000
        })
      )
    } else if (e.target.name == "password2" && e.target.value !== userData.password) {
      return (
        // setMsgMis("Passwords must match")
        showNotification({
          title: "Passwords must match",
          autoClose: 1000
        })
      )
    } else {
      return (setMsgMis(""))
    }



  }


  // Resetting user data
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

  // Register function / Axios call
  const register = async () => {

    let fieldsArr = Object.entries(userData);
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

    // Nickname length validation
    if ((userData.nickname.length < 3) || (userData.nickname.length > 12)) {
      // seterrorMsg("nickname must be between 3 and 12 characters")
      showNotification({
        title: "Nickname must be between 4 and 10 characters",
        // message: 'Hey there, your code is awesome! 🤥',
        autoClose: 3000
      })
      nickLengthError = true;
    } else {
      if (seterrorMsg == "") {
        seterrorMsg("")
        nickLengthError = false;
      }

    }

    // Password mismatch validation
    if (userData.password !== userData.password2) {
      // seterrorMsg("Passwords must match")
      showNotification({
        title: "Passwords must match",
        // message: 'Hey there, your code is awesome! 🤥',
        autoClose: 3000
      })

      passMisError = true;
    } else {
      if (seterrorMsg == "") {
        seterrorMsg("")
        passMisError = false;
      }

    }

    // Password length validation
    if ((userData.password.length < 4) || (userData.password.length > 10)) {
      // seterrorMsg("Password must be between 4 and 10 characters")
      showNotification({
        title: "Password must be between 4 and 10 characters",
        // message: 'Hey there, your code is awesome! 🤥',
        autoClose: 3000
      })
      passLengthError = true;
    } else {
      if (seterrorMsg == "") {
        seterrorMsg("")
        passLengthError = false;
      }

    }

    if (!checked) {
      showNotification({
        title: "Please, confirm that you're 18 years old to continue.",
        // message: 'Hey there, your code is awesome! 🤥',
        autoClose: 3000
      })
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
    if (!regexError && !nickLengthError && !passMisError && !passLengthError && !ageError) {
      try {

        result = await axios.post("https://socialmeme.herokuapp.com/users/register", body)


        if (result.data != "This user already exists in the database") {
          showNotification({
            title: 'Your account was created succesfully! Please, log in to validate your account.',
            // message: 'Hey there, your code is awesome! 🤥',
            autoClose: 3000
          })

          setTimeout(() => {
            clearHooks();
            navigate("/")

          }, 3000);
        } else {

          showNotification({
            title: result.data,
            // message: 'Hey there, your code is awesome! 🤥',
            autoClose: 3000
          })

        }




      } catch (error) {
        console.log("Register error", error)
      }
    }
  }
  const enterPress = (e) => {
    if (e.key === "Enter") {
      register();
    }
  }
  return (
    <>
      <>
        {/* {<pre>{JSON.stringify(userData, null, 2)}</pre>} */}
        {/* {<pre>{JSON.stringify(checked, null, 2)}</pre>}
        {<pre>{JSON.stringify(msgLength, null, 2)}</pre>}s
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
        className="register_form_inputs"
        onKeyDown={(e) => { enterPress(e) }}
      />
      <TextInput
        required
        label="Email"
        placeholder="your@email.com"
        onChange={(e) => { fillForm(e) }}
        name="email"
        value={userData.email}
        className="register_form_inputs"
        onKeyDown={(e) => { enterPress(e) }}
      />
      <TextInput
        required
        label="Password"
        type="password"
        placeholder="4 characters min"
        onChange={(e) => { fillForm(e) }}
        name="password"
        value={userData.password}
        className="register_form_inputs"
        onKeyDown={(e) => { enterPress(e) }}
      />

      <TextInput
        required
        label="Repeat your password"
        type="password"
        placeholder="4 characters min"
        onChange={(e) => { fillForm(e) }}
        name="password2"
        value={userData.password2}
        className="register_form_inputs"
        onKeyDown={(e) => { enterPress(e) }}
      />

      <Checkbox
        mt="md"
        label="I am +18 years old*"
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