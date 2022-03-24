import React, {useEffect, useState} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import TemporaryButton from '../../Components/TemporaryButton/TemporaryButton';

import './Profile.css';

const Profile = () => {
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



        if(displayLoginForm === "flex"){
            
            setAnimComponent("animationContainerFromTop")
            setAnimButton("animationButtonSwitch")
            setDisplayLoginForm("none")
            setDisplayRegisterForm("flex")

        }else{

            setAnimButton("animationButtonSwitch")
            setAnimComponent("animationContainerFromTop")
            setDisplayRegisterForm("none")
            setDisplayLoginForm("flex")
        }
    }


return (
    <div className="container_box" id="profile_box">
        
        {/* TEMPORARY SCREEN SWITCH BUTTONS */}

        <TemporaryButton viewNameDisplay={"home"} pathUrl={"/home"}/>
        <TemporaryButton viewNameDisplay={"login"} pathUrl={"/"}/>


{/* THIS WILL BE A CAROUSEL OF IMAGES */}

        <div className="component_profile">
            <div className='component_box' id="animationContainerFromTop">
            <div>
                profile here<br/>
                <br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
            </div>
            </div>
        </div>           
    </div>
    )
}
export default Profile;