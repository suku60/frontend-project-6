import React, { useEffect, useState } from 'react';

import './Login.css';
import RegisterForm from '../../Components/RegisterForm/RegisterForm'
import { ScrollArea } from '@mantine/core';
const Login = () => {

    // HOOKS

    // animations
    const [animComponent, setAnimComponent] = useState("");
    const [animButton, setAnimButton] = useState("");

    // displays
    const [displayLoginForm, setDisplayLoginForm] = useState("flex");
    const [displayRegisterForm, setDisplayRegisterForm] = useState("none");

    // FUNCTIONS

    // Function that swaps register/login components

    const swapButton = () => {



        if (displayLoginForm === "flex") {

            setAnimComponent("animationButtonSwitch")
            setAnimButton("animationButtonSwitch")
            setDisplayLoginForm("none")
            setDisplayRegisterForm("flex")
        } else {

            setAnimButton("animationButtonSwitch")
            setAnimComponent("animationButtonSwitch")
            setDisplayRegisterForm("none")
            setDisplayLoginForm("flex")
        }
    }

    return (
        <div className="container_box" id="login_box">

            {/* FIXED WELCOME MEMES AND LOGO  */}
            <div className="container_welcome_images" id="animationContainerFromTop">
                hello I'll have some memes and the Logo 1/2 centered.
            </div>

            {/* HERE WE HAVE THE BUTTON THAT SWITCHES LOGIN/REGISTER FORMS AND THE FORMS */}

            <div className="container_login_forms">

                <div className="box_login_register_button" id="animationButtonSwitch">
                    <div className="login_register_button" id={animButton} style={{ display: displayRegisterForm }} onClick={() => swapButton()}>Already an user?<br />Log here</div>
                    <div className="login_register_button" id={animButton} style={{ display: displayLoginForm }} onClick={() => swapButton()}>Need an account?<br />Click here</div>
                </div>

                <div className="component_login" style={{ display: displayLoginForm }} id="animationButtonSwitch">
                    <div className='login_box' id={animComponent}>
                        {/* <div className="login_message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                            Tenetur iure dolorum, <br />
                            deleniti odit error ad aspernatur. <br />
                            Consectetur minima, <br />
                            architecto quod excepturi, <br />
                            eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                        </div> */}

                        <div className="login_inputs">
                            <input type="name" name="nickname" title="nick"
                                autoComplete="off" />
                            <input type="password" name="password" title="pass"
                                autoComplete="off" />
                        </div>

                        <div className="login_button"></div>
                    </div>
                </div>

                <div className="component_register" style={{ display: displayRegisterForm }} id="animationButtonSwitch">
                    <div className='register_box' id={animComponent}>
                        <div className='scroll_div_login'>
                            <ScrollArea className='scroll_area_login'>
                                <RegisterForm className="registerForm"></RegisterForm>
                            </ScrollArea>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    )
}
export default Login;