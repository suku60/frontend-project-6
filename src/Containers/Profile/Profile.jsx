import React, {useEffect, useState, Component} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import TemporaryButton from '../../Components/TemporaryButton/TemporaryButton';

import './Profile.css';

const Profile = () => {
    // HOOKS

    // FUNCTIONS


return (
    <div className="container_box" id="profile_box">

        {/* PROFILE PIC AND DATA */}

        <div className="container_profile_data" id="animationContainerFromTop">
                    hello I'll have profile pic and data.
                </div>


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