import React, { useEffect, useState } from 'react';

import './Login.css';


import {ReactComponent as LogoSvg} from '../../assets/svg/logo.svg'
import {ReactComponent as SplashSvg} from '../../assets/svg/splash.svg'
import {ReactComponent as MemeworkSvg} from '../../assets/svg/memework_text.svg'
import {ReactComponent as JoinSvg} from '../../assets/svg/join_text.svg'

import RegisterForm from '../../Components/RegisterForm/RegisterForm'
import LoginForm from '../../Components/LoginForm/LoginForm'
import { ScrollArea } from '@mantine/core';
const Login = () => {

    // HOOKS

    // animations
    const [animComponent, setAnimComponent] = useState("");
    const [animButton, setAnimButton] = useState("");

    // displays
    const [displayLoginForm, setDisplayLoginForm] = useState("flex");
    const [displayRegisterForm, setDisplayRegisterForm] = useState("none");

    // SVG logo & text hooks
    const [positionLogo, SetPositionLogo] = useState("animationLogoStart");
    const [positionLogoClass, SetPositionLogoClass] = useState("main_logo");

    const [positionSplash,SetPositionSplash] = useState("animationSplashStart");
    const [positionSplashClass,SetPositionSplashClass] = useState("splash_logo");

    const [positionMemeworkText, SetPositionMemeworkText] = useState("animationTextStart");
    const [positionMemeworkTextClass, SetPositionMemeworkTextClass] = useState("memework_text");

    const [positionJoinText, SetPositionJoinText] = useState("animationTextStart");
    const [positionJoinTextClass, SetPositionJoinTextClass] = useState("join_text");

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

    // Function that hides the logo and visual things and shows the inputs.

    const hideLogoShowInputs = () => {

        SetPositionLogo("animationLogoEnd");
        SetPositionSplash("animationSplashEnd")
        SetPositionMemeworkText("animationMemeworkTextEnd")
        SetPositionJoinText("animationJoinTextEnd")

        setTimeout(() => {
            SetPositionLogoClass("main_logo_end")
            SetPositionSplashClass("splash_logo_end")
            SetPositionMemeworkTextClass("memework_text_end")
            SetPositionJoinTextClass("join_text_end")
          }, 2900)
        

    }

    return (
        <div className="container_box" id="login_box">

            {/* FIXED WELCOME MEMES AND LOGO  */}
            <div className="container_welcome_images" id="animationContainerFromTop">

                {/* <LogoSvg className="main_logo" id="animationLogoStart"/> */}
                <LogoSvg className={positionLogoClass} id={positionLogo}/>
                {/* <SplashSvg className="splash_logo" id="animationSplashStart"/> */}
                <SplashSvg className={positionSplashClass} id={positionSplash}/>
                {/* <MemeworkSvg className='memework_text' id="animationTextStart"/> */}
                <MemeworkSvg className={positionMemeworkTextClass} id={positionMemeworkText}/>
                {/* <JoinSvg className='join_text' id="animationTextStart"/> */}
                <JoinSvg className={positionJoinTextClass} id={positionJoinText}/>
                <div className="container_enter_button">
                    <div className="enter_button" onClick={()=>{hideLogoShowInputs()}}>Enter</div>
                </div>

            </div>
            {/* HERE WE HAVE THE BUTTON THAT SWITCHES LOGIN/REGISTER FORMS AND THE FORMS */}

            <div className="container_login_forms">

                <div className="box_login_register_button" id="animationButtonSwitch">
                    <div className="login_register_button" id={animButton} style={{ display: displayRegisterForm }} onClick={() => swapButton()}>Already an user?<br />Log here</div>
                    <div className="login_register_button" id={animButton} style={{ display: displayLoginForm }} onClick={() => swapButton()}>Need an account?<br />Click here</div>
                </div>

                <div className="component_login" style={{ display: displayLoginForm }} id="animationButtonSwitch">
                    <div className='login_box_form' id={animComponent}>
                        {/* <div className="login_message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                            Tenetur iure dolorum, <br />
                            deleniti odit error ad aspernatur. <br />
                            Consectetur minima, <br />
                            architecto quod excepturi, <br />
                            eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                        </div> */}

                        {/* <div className="login_inputs">
                            <input type="name" name="nickname" title="nick"
                                autoComplete="off" />
                            <input type="password" name="password" title="pass"
                                autoComplete="off" />
                        </div>

                        <div className="login_button"></div> */}
                        <div className='scroll_div_login_form'>
                            <ScrollArea className='scroll_area_login_form'>
                                <LoginForm className="login_form"></LoginForm>
                            </ScrollArea>
                        </div>
                    </div>
                </div>

                <div className="component_register" style={{ display: displayRegisterForm }} id="animationButtonSwitch">
                    <div className='register_box_form' id={animComponent}>
                        <div className='scroll_div_register_form'>
                            <ScrollArea className='scroll_area_register_form'>
                                <RegisterForm className="register_form"></RegisterForm>
                            </ScrollArea>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login;