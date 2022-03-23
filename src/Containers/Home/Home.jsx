import React, {useEffect, useState} from 'react';
import './Home.css';

const Home = () => {

    // HOOKS

    // animations
    const [animComponent, setAnimComponent] = useState("");
 
    // displays
    const [displayLoginButton, setDisplayLoginButton] = useState("none");
    const [displayRegisterButton, setDisplayRegisterButton] = useState("flex");

    // FUNCTIONS

    
    console.log(animComponent)

    const swapButton = () => {

        if(displayLoginButton === "flex"){
            setDisplayLoginButton("none")
            setDisplayRegisterButton("flex")
        }else{
            
           setAnimComponent("animationContainerFromTop")
            setDisplayLoginButton("flex")
            setDisplayRegisterButton("none")
        }

        
      setTimeout(() => {
        setAnimComponent("")
      }, 1000);

        console.log(animComponent)
    }

    



return (
    <div className="container_box" id="home_box">
        <div className="login_register_button" id="button_swap" onClick={()=>swapButton()}></div>

        <div className="component_login" style={{display : displayLoginButton}} id="animationContainerFromTop">
            <div className='component_box' id={animComponent}>
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
        
        <div className="component_register" style={{display : displayRegisterButton}} id={animComponent}>
            <div className='component_box' id="register_box">
            <div className="register_inputs"></div>
           
            <div className="register_button"></div>
 
       </div></div>

    </div>
    )
}
export default Home;