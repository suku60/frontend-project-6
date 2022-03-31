import React, {useEffect, useState, Component} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import NavigationButton from '../../Components/NavigationButton/NavigationButton';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';

import './Profile.css';

const Profile = (props) => {
    
    let navigate = useNavigate();
    
    // HOOKS

    // useEffect  
    useEffect(() => {

        console.log(props.credentials)

        if(props.credentials?.token === ""){
            navigate("/");
        }

    },[]);

    // FUNCTIONS
    const easeProfileDataOut = () => {
        // document.getElementById("")
        console.log("scrolling")
    }



return (
    <div className="container_box" id="profile_box">
         <div>
                <Helmet>
                    <title>tomeme | Profile</title>
                </Helmet>
            </div>

{/* PROFILE PIC AND DATA */}
        <div className="container_profile_data" id="animationContainerFromTop" onScroll={()=>easeProfileDataOut()}>
                    hello I'll have profile pic and data.
                    <div className="container_profile_photo"></div>
                </div>

{/* THIS WILL BE A CAROUSEL OF IMAGES */}
        <div className="component_profile">
            <div className='component_profile' id="animationContainerFromTop">
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
        <div className="component_profile">
            <div className='component_profile' id="animationContainerFromTop">
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
export default connect((state) => ({
    credentials: state.credentials
  }))(Profile);