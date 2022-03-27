import React from 'react';
import TemporaryButton from '../TemporaryButton/TemporaryButton';


import './RightNavbar.css';

const RightNavbar = () => {

    return (
        <div className='nav_box'>
            <div className="nav_container">
            <TemporaryButton viewNameDisplay={"home"} pathUrl={"/home"}/>
            <TemporaryButton viewNameDisplay={"profile"} pathUrl={"/profile"}/>
            <TemporaryButton viewNameDisplay={"search"} pathUrl={"/search"}/>   
            <TemporaryButton viewNameDisplay={"login"} pathUrl={"/"}/>
            </div>
        </div>
    )
};

export default RightNavbar;