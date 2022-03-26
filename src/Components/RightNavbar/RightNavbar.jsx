import React from 'react';
import TemporaryButton from '../TemporaryButton/TemporaryButton';


import './RightNavbar.css';

const RightNavbar = () => {

    return (
        <div className='nav_box'>
        <TemporaryButton viewNameDisplay={"home"} pathUrl={"/home"}/>
        <TemporaryButton viewNameDisplay={"profile"} pathUrl={"/profile"}/>
        <TemporaryButton viewNameDisplay={"search"} pathUrl={"/search"}/>
        
        <TemporaryButton viewNameDisplay={"login"} pathUrl={"/"}/>
        </div>
    )
};

export default RightNavbar;