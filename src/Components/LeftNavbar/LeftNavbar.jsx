import React from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';

import './LeftNavbar.css';

const LeftNavbar = () => {

    return (
        <div className='nav_box'>
            <div className="nav_container">
                <div className="nav_items">
                    <div className="navbar_logo">logo here</div>
                    <NavigationButton viewNameDisplay={"home"} pathUrl={"/home"}/>
                    <NavigationButton viewNameDisplay={"search"} pathUrl={"/search"}/>   
                    <NavigationButton viewNameDisplay={"login"} pathUrl={"/"}/>
                    <NavigationButton viewNameDisplay={"admin"} pathUrl={"/admin"}/>
                    <div className="navbar_logo">logout here</div>                
                </div>
                
                <div className="nav_item_profile">
                    <NavigationButton viewNameDisplay={"profile"} pathUrl={"/profile"}/>
                </div>
            </div>
        </div>
    )
};

export default LeftNavbar;