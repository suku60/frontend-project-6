import React, { useState } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';

import { ReactComponent as HomeSvg } from '../../assets/svg/home.svg'
import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg'
import { ReactComponent as ProfileSvg } from '../../assets/svg/profile.svg'
import { ReactComponent as NewPostSvg } from '../../assets/svg/newpost.svg'

import { ReactComponent as LogoSvg } from '../../assets/svg/logo.svg'

import { Modal, Group } from '@mantine/core';
import '../PostForm/PostForm'

import './LeftNavbar.css';
import PostForm from '../PostForm/PostForm';



const LeftNavbar = () => {

    //Mantine hooks
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open navigation';

    const clicked = () => {
        console.log('clicked');
    }


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
                    <NavigationButton viewNameDisplay={"admin"} pathUrl={"/admin"} />
                    <div className="navbar_logo">logout here</div>
                </div>

                <div className="nav_item_newPost" >
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
                                viewNameDisplay={"New Post"}
                                buttonIcon={<NewPostSvg />}
                                type="newPost"
                            />
                        </Group>
                    </>
                </div>
                <div className="nav_item_profile">
                    <NavigationButton viewNameDisplay={"profile"} pathUrl={"/profile"} buttonIcon={<ProfileSvg />} />
                </div>
            </div>
        </div>
    )
};

export default LeftNavbar;