import React, {useEffect, useState} from 'react';
import './Home.css';

const Home = () => {

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
export default Home;