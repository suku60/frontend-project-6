import React from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';

import {ReactComponent as HomeSvg} from '../../assets/svg/home.svg'

import {ReactComponent as SearchSvg} from '../../assets/svg/search.svg'
import {ReactComponent as ProfileSvg} from '../../assets/svg/profile.svg'

import './LeftNavbar.css';

const LeftNavbar = () => {

    return (
        <div className='nav_box'>
            <div className="nav_container">
                <div className="nav_items">
                    <div className="navbar_logo">logo here</div>
                    <NavigationButton viewNameDisplay={"home"} pathUrl={"/home"} buttonIcon={<HomeSvg/>}/>
                    <NavigationButton viewNameDisplay={"search"} pathUrl={"/search"} buttonIcon={<SearchSvg/>}/>   
                    <NavigationButton viewNameDisplay={"login"} pathUrl={"/"}/>
                    <NavigationButton viewNameDisplay={"admin"} pathUrl={"/admin"}/>
                    <div className="navbar_logo">logout here</div>                
                </div>
                
                <div className="nav_item_profile">
                    <NavigationButton viewNameDisplay={"profile"} pathUrl={"/profile"} buttonIcon={<ProfileSvg/>}/>
                </div>
            </div>
        </div>
    )
};

export default LeftNavbar;