import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TemporaryButton from '../../Components/TemporaryButton/TemporaryButton';

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

    // Axios functions / Register (commented until further developement)

    // const sendUserData = async () =>{

    //     // setHideForm("none");
  
    //     // setDisplayRegisterButton("none")
  
    //     // setProcessingMessage("flex")
  
    //     setValidationMessage("");
  
    //     let errorDisplay = "";
  
    //     let rawUserData = Object.entries(userData);
  
    //     // Hola David, dejo esta parte del código comentada puesto que no quiero incluir la verificación de pass en mi registro, ya que quiero quitarle esta facilidad
    //     // a quienes se registren, y que se aseguren bien de que están escribiendo la password correctamente. 
        
    //     // Raw data user will be the array we will get after error check
  
    //     // --------------------   PASSWORD ERROR CHECKER
  
    //     // if(userData.password !== userData.password2){
  
    //     //   return (setValidationMessage("Both password fields must match"));
  
    //     // }else{
    //     //   setValidationMessage("");
    //     // }
  
    //     // -------------------- Birthdate function: 3 different inputs with 3 fields = 2(day)/2(month)/4(year)
    //     // all 3 combined make a whole date (find dataType that is useful for this)
  
    //     // if(userData.birthdate !== ){
  
    //     //   return (setValidationMessage("Both password fields must match"));
  
    //     // }else{
    //     //   setValidationMessage("");
    //     // }
  
    //     for(let field of rawUserData){
  
    //       // error / validations
  
    //       errorDisplay = validations(field[0],field[1]);
  
    //       if(errorDisplay !== "valid"){
    //         setValidationMessage(errorDisplay);
    //         return;
  
    //         // when the validations are not ok, we're not going to allow the register
  
    //       };
    //     };
  
    //     // Build the body for the post data send.
  
    //     let dataBody = {
    //       name: userData.name,
    //       birthdate: userData.birthdate,
    //       username: userData.username,
    //       password: userData.password,
    //       email: userData.email
    //     }
  
    //     try  {
  
    //       let dataResponse = await axios.post("http://localhost:3000/users/new", dataBody);
        
    //     setDisplayWarmWelcome("100");
          
        
    //     setHideForm("none");
  
    //     setDisplayRegisterButton("none")
  
    //     setProcessingMessage("flex")
  
    //     setTimeout(() => {
    //       desiredView("/login")
    //     }, 6600);
  
    //     }catch(errorDisplay) {
        
    //     }
        
    //   };

    console.log("console log that breaks comments")
   
    // Axios Functions / Login (commented until further developement)

    // const userLogin = async () =>{

    //     setHideForm("none");

    //       setDisplayLoginButton("none")
    
    //       setProcessingMessage("flex")
    


    //     let dataBody = {
    //       username: userData.username,
    //       password: userData.password
    //     }
  
    //     try  {
  
    //       let dataResponse = await axios.post("http://localhost:3000/users/login", dataBody);

    //       console.log("this is dataresponse", dataResponse)

    //     if(dataResponse.data?.token !== undefined){   
          
    //       // setDisplayValidResponse("flex");
    //       // setDisplayLoginInputs("none");
    
    //       setTimeout(() => {
            
    //       props.dispatch({type: LOGIN, payload: dataResponse.data})
    //         desiredView("/profile")

            
    //       }, 2600);

    //     }else{

    //       setTimeout(() => {
            
    //       setDisplayErrorResponse("flex")
    //       setDisplayLoginInputs("none");  
            
    //       }, 1500);
    //       // setDisplayErrorResponse("flex")

    //       setTimeout(() => {
    //       setDisplayErrorResponse("none")
    //       setDisplayLoginInputs("flex");
    //       setHideForm("flex");
    //       setDisplayLoginButton("flex")
    
    //       setProcessingMessage("none")

    //       }, 3500);
    //     }

    //     }catch(error) {

    //     }
        
    //   };


return (
    <div className="container_box" id="login_box">
        <div className="container_welcome_images" id="animationContainerFromTop">
            hello I'll have some memes and the Logo 1/2 centered.
        </div>

{/* THIS WILL BE A CAROUSEL OF IMAGES */}

        {/* <div className="component_login">
            <div className='component_box' id="animationContainerFromTop">
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Tenetur iure dolorum, <br/>
                deleniti odit error ad aspernatur. <br/>
                Consectetur minima, <br/>
                architecto quod excepturi, <br/>
                eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br/>
            </div>

            </div>
        </div>     */}

{/* HERE WE HAVE THE BUTTON THAT SWITCHES LOGIN/REGISTER FORMS AND THE FORMS */}


        {/* <div className="box_login_register_button" id="animationContainerFromTop">
            <div className="login_register_button" id={animButton} style={{display : displayRegisterForm}} onClick={()=>swapButton()}>Already an user?<br/>Log here</div>
            <div className="login_register_button" id={animButton} style={{display : displayLoginForm}} onClick={()=>swapButton()}>Need an account?<br/>Click here</div>
        </div>
        <div className="component_login" style={{display : displayLoginForm}} id="animationContainerFromTop">
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
            </div>

            <div className="login_button"></div>
            </div>
        </div>     
        
        <div className="component_register" style={{display : displayRegisterForm}} id="animationContainerFromTop">
            <div className='component_box register_box' id={animComponent}>
            <div className="register_inputs">
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
           
            <div className="register_button"></div>
 
        </div>
        </div> */}

        <div className="container_login_forms">
            <div className="box_login_register_button" id="animationContainerFromTop">
                  <div className="login_register_button" id={animButton} style={{display : displayRegisterForm}} onClick={()=>swapButton()}>Already an user?<br/>Log here</div>
                  <div className="login_register_button" id={animButton} style={{display : displayLoginForm}} onClick={()=>swapButton()}>Need an account?<br/>Click here</div>
              </div>
              <div className="component_login" style={{display : displayLoginForm}} id="animationContainerFromTop">
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
                  </div>
    
                  <div className="login_button"></div>
                  </div>
          </div>     
          
          <div className="component_register" style={{display : displayRegisterForm}} id="animationContainerFromTop">
              <div className='component_box register_box' id={animComponent}>
              <div className="register_inputs">
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
             
              <div className="register_button"></div>

          </div>
          </div>
        </div>

       

    </div>
    )
}
export default Login;