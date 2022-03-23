import React, {useEffect, useState} from 'react';
import './Home.css';

const Home = () => {

    const [displayLoginButton, setDisplayLoginButton] = useState("none");
    const [displayRegisterButton, setDisplayRegisterButton] = useState("flex");

    const swapButton = () => {
        
        if(displayLoginButton === "flex"){
            setDisplayLoginButton("none")
            setDisplayRegisterButton("flex")
        }else{
            setDisplayLoginButton("flex")
            setDisplayRegisterButton("none")
        }

    }



return (
    <div className="container_box" id="home_box">
        <div className="login_register_button" id="button_swap" onClick={()=>swapButton()}></div>

        <div className="component_login" style={{display : displayLoginButton}}>
            <div className='component_box'>
            <div className="login_message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
            </div>
            <div className="login_inputs"></div>
            <div className="login_button"></div>
            </div>
        </div>     
        <div className="component_register" style={{display : displayRegisterButton}}>
            <div className='component_box' id="register_box">
            <div className="register_inputs"></div>
           
            <div className="register_button"></div>
 
       </div></div>

    </div>
    )
}
export default Home;