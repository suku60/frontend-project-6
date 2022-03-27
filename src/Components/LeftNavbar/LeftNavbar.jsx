import React from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';

import './LeftNavbar.css';

const LeftNavbar = () => {

    return (
        <div className='nav_box'>
            <div className="nav_container">
                <div className="nav_items">
                    <NavigationButton viewNameDisplay={"homeeeeeeee"} pathUrl={"/home"}/>
                    <NavigationButton viewNameDisplay={"profile"} pathUrl={"/profile"}/>
                    <NavigationButton viewNameDisplay={"search"} pathUrl={"/search"}/>   
                    <NavigationButton viewNameDisplay={"login"} pathUrl={"/"}/>
                </div>
            </div>
        </div>
    )
};

export default LeftNavbar;