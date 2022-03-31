import React, { useState } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';

import { ReactComponent as HomeSvg } from '../../assets/svg/home.svg'
import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg'
import { ReactComponent as ProfileSvg } from '../../assets/svg/profile.svg'
import { ReactComponent as NewPostSvg } from '../../assets/svg/newpost.svg'

import { ReactComponent as LogoSvg } from '../../assets/svg/logo.svg'

import { Modal, Group, useMantineDefaultProps } from '@mantine/core';
import '../PostForm/PostForm'

import './LeftNavbar.css';
import PostForm from '../PostForm/PostForm';

import { connect } from 'react-redux';



const LeftNavbar = (props) => {

    //Mantine hooks
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open navigation';



    const renderAdminBttn = () => {
        if (!props.credentials.token) {
            return (
                <></>
            )
        } else if (props.credentials.token && props.credentials.role === "admin") {
            return (
                <NavigationButton viewNameDisplay={"admin"} pathUrl={"/admin"} />
            )
        }
    }

    const renderNewPostBttn = () => {
        if (!props.credentials.token) {
            return (
                <></>
            )

        } else {
            return (
                <>
                    <Modal
                        opened={opened}
                        onClose={() => {
                            setOpened(false);
                        }}
                    >
                        <PostForm></PostForm>
                    </Modal>
                    <Group position="center"
                        onClick={() => setOpened(true)}
                    >
                        <NavigationButton
                            viewNameDisplay={"new post"}
                            buttonIcon={<NewPostSvg />}
                            type="newPost"
                        />
                    </Group>
                </>
            )
        }
    }

    const renderProfileBttn = () => {
        if (!props.credentials.token) {
            return (
                <></>
            )

        } else {
            return (
                <NavigationButton viewNameDisplay={props.credentials.user[0].nickname} pathUrl={"/profile"} buttonIcon={<ProfileSvg />} />
            )
        }
    }



    if (!props.credentials.token) {
        
    return (
        <div className='nav_box'>
            <div className="nav_container">
                <div className="nav_items">
                    <div className="navbar_logo_container">
                        <div className="navbar_logo">
                            <LogoSvg />
                        </div>
                        <div className="navbar_logo_text">
                            tomeme
                        </div>

                    </div>
                    {/* <NavigationButton viewNameDisplay={"home"} pathUrl={"/home"} buttonIcon={<HomeSvg />} /> */}
                    {/* <NavigationButton viewNameDisplay={"search"} pathUrl={"/search"} buttonIcon={<SearchSvg />} /> */}
                    {/* <NavigationButton viewNameDisplay={"login"} pathUrl={"/"}/> */}
                    {renderAdminBttn()}
                    <div className="navbar_logo">logout here</div>
                </div>

                <div className="nav_item_newPost" >
                    {renderNewPostBttn()}
                </div>
                <div className="nav_item_profile">
                    {renderProfileBttn()}
                </div>
            </div>
        </div>
    )
    }else{
        return (
            <div className='nav_box'>
                <div className="nav_container">
                    <div className="nav_items">
                        <div className="navbar_logo_container">
                            <div className="navbar_logo">
                                <LogoSvg />
                            </div>
                            <div className="navbar_logo_text">
                                tomeme
                            </div>
    
                        </div>
                        <NavigationButton viewNameDisplay={"home"} pathUrl={"/home"} buttonIcon={<HomeSvg />} />
                        <NavigationButton viewNameDisplay={"search"} pathUrl={"/search"} buttonIcon={<SearchSvg />} />
                        {/* <NavigationButton viewNameDisplay={"login"} pathUrl={"/"}/> */}
                        {renderAdminBttn()}
                        <div className="navbar_logo">logout here</div>
                    </div>
    
                    <div className="nav_item_newPost" >
                        {renderNewPostBttn()}
                    </div>
                    <div className="nav_item_profile">
                        {renderProfileBttn()}
                    </div>
                </div>
            </div>
        )

    }
};

export default connect((state) => ({
    credentials: state.credentials
}))(LeftNavbar);