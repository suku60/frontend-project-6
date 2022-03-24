import React, {useEffect, useState} from 'react';
import './Login.css';

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
    <div className="container_box" id="home_box">

{/* THIS WILL BE A CAROUSEL OF IMAGES */}

        <div className="component_login">
            <div className='component_box'>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
            </div>

            </div>
        </div>    

{/* HERE WE HAVE THE BUTTON THAT SWITCHES LOGIN/REGISTER FORMS AND THE FORMS */}


        <div className="box_login_register_button">
            <div className="login_register_button" id={animButton} style={{display : displayLoginForm}} onClick={()=>swapButton()}>login</div>
            <div className="login_register_button" id={animButton} style={{display : displayRegisterForm}} onClick={()=>swapButton()}>register</div>
        </div>
        <div className="component_login" style={{display : displayLoginForm}}>
            <div className='component_box' id={animComponent}>
            <div className="login_message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
            </div>

            <div className="login_inputs">
                <input type="name" name="nickname" title="nick" 
                autoComplete="off"/>
                <input type="password" name="password" title="pass" 
                autoComplete="off"/>
                <input type="email" name="email" title="email" 
                autoComplete="off"/>
                <input type="file" name="avatar" title="avatar" 
                autoComplete="off" id="input_file"/>
                by clicking here I'm comfirming I am 18 years old or more. 
                <input type="checkbox" name="avatar" title="avatar" 
                autoComplete="off"/>
            
            </div>

            <div className="login_button"></div>
            </div>
        </div>     
        
        <div className="component_register" style={{display : displayRegisterForm}}>
            <div className='component_box register_box' id={animComponent}>
            <div className="register_inputs"></div>
           
            <div className="register_button"></div>
 
       </div></div>

      

       

    </div>
    )
}
export default Login;