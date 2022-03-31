import React, { useEffect, useState, Component } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import NavigationButton from '../../Components/NavigationButton/NavigationButton';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import { ScrollArea, Accordion } from '@mantine/core';

import './Profile.css';

const Profile = (props) => {

    let navigate = useNavigate();

    // HOOKS
    const [userData, setUserData] = useState(props.credentials.user[0]);
    const [posts, setPosts] = useState([]);
    const [postsCommented, setPostsCommented] = useState([]);
    const [postsAnswered, setPostsAnswered] = useState([]);

    const [commentsArr, setCommentsArr] = useState([]);
    const [answersArr, setAnswersArr] = useState([]);

    // useEffect  
    useEffect(() => {

        console.log(props.credentials)

        if (props.credentials?.token === "") {
            navigate("/");
        }

        getUserPostsAndComments();

    }, []);

    // FUNCTIONS
    const easeProfileDataOut = () => {
        // document.getElementById("")
        console.log("scrolling")
    }

    const getUserPostsAndComments = async () => {
        let results = await axios.get(`https://socialmeme.herokuapp.com/posts/actions/findByUser?userId=${props.credentials.user[0]._id}`);

        // setPosts(results.data.posts);
        // setPostsCommented(results.data.comments);
        // setPostsAnswered(results.data.answers);

        console.log(results.data.posts);
        console.log(results.data.comments);
        console.log(results.data.answers);
        // console.log(posts, postsCommented, postsAnswered);
        // console.log(posts, postsCommented, postsAnswered);
    }



    return (
        <div className="container_box" id="profile_box">
            <div>
                <Helmet>
                    <title>tomeme | Profile</title>
                </Helmet>
            </div>

            {/* PROFILE PIC AND DATA */}
            <div className="container_profile_data" id="animationContainerFromTop" onScroll={() => easeProfileDataOut()}>
                hello I'll have profile pic and data.
                <div className="container_profile_photo"></div>
            </div>

            {/* THIS WILL BE A CAROUSEL OF IMAGES */}
            <div className="component_profile">
                <div className='component_profile' id="animationContainerFromTop">
                    <div>
                        profile here<br />
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                        Tenetur iure dolorum, <br />
                        deleniti odit error ad aspernatur. <br />
                        Consectetur minima, <br />
                        architecto quod excepturi, <br />
                        eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                        Tenetur iure dolorum, <br />
                        deleniti odit error ad aspernatur. <br />
                        Consectetur minima, <br />
                        architecto quod excepturi, <br />
                        eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                        Tenetur iure dolorum, <br />
                        deleniti odit error ad aspernatur. <br />
                        Consectetur minima, <br />
                        architecto quod excepturi, <br />
                        eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                    </div>
                </div>
            </div>
            <div className="component_profile">
                <div className='component_profile' id="animationContainerFromTop">
                    <div>
                        profile here<br />
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                        Tenetur iure dolorum, <br />
                        deleniti odit error ad aspernatur. <br />
                        Consectetur minima, <br />
                        architecto quod excepturi, <br />
                        eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                        Tenetur iure dolorum, <br />
                        deleniti odit error ad aspernatur. <br />
                        Consectetur minima, <br />
                        architecto quod excepturi, <br />
                        eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                        Tenetur iure dolorum, <br />
                        deleniti odit error ad aspernatur. <br />
                        Consectetur minima, <br />
                        architecto quod excepturi, <br />
                        eaque esse quidem ratione odio laboriosam enim ipsum facilis?<br />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credentials: state.credentials
}))(Profile);