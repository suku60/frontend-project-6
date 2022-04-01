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


    //Style Hooks
    // post data
    const [postDataDisplay, setPostDataDisplay] = useState("flex");

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

    const HideShowPostData = () => {

        if (postDataDisplay === "flex") {

            setPostDataDisplay("none")
        } else if (postDataDisplay === "none") {

            setPostDataDisplay("flex")

        }


    }

    const getUserPostsAndComments = async () => {
        let results = await axios.get(`https://socialmeme.herokuapp.com/posts/actions/findByUser?userId=${props.credentials.user[0]._id}`);



        setPosts(results.data.posts);
        setPostsCommented(results.data.comments);
        setPostsAnswered(results.data.answers);


        if (results.data.comments.length > 0) {
            let commentsResults = await axios.get(`https://socialmeme.herokuapp.com/posts/actions/findCommentsByUser?userId=${props.credentials.user[0]._id}`)
            setCommentsArr(commentsResults.data);
            // console.log("comments arr = ", commentsResults);
        }

        if (results.data.answers.length > 0) {
            let answersResults = await axios.get(`https://socialmeme.herokuapp.com/posts/actions/findAnswersByUser?userId=${props.credentials.user[0]._id}`)
            setAnswersArr(answersResults.data);
            // console.log("answers arr = ", answersResults);
        }

        // console.log("posts = " ,results.data.posts);
        // console.log("commented Posts = ", results.data.comments.data);
        // console.log("answered Posts = ", results.data.answers.data);
    }

    const renderPostCommented = (postId) => {
        console.log(postId);
        console.log("hey");
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
                    {/* POSTS */}
                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`Your Posts`}>
                            <div className='accordionContent'>
                                {posts?.map(images => {
                                    return (

                                        <div className='meme_card' key={images._id}>
                                            <img className='meme_photo' src={images.img} alt={images.title} />
                                            <div className="meme_card_data">

                                                <div className="meme_name" style={{ display: postDataDisplay }}>{images.title}
                                                </div>
                                                <div className="meme_name" style={{ display: postDataDisplay }}>{images.text}
                                                </div>
                                                <div className="meme_rating" style={{ display: postDataDisplay }}>rating: {images.ratingAverage}
                                                </div>
                                                <Accordion className='meme_comments_accordion' iconPosition="right" iconSize={0} offsetIcon={false} onClick={() => HideShowPostData()}>
                                                    <Accordion.Item label={`Comments`}>
                                                        <div className='accordionContent'>
                                                            {images.comments.map(elmnt => {
                                                                return (
                                                                    <div className='meme_comment_box' key='elmnt.commentId'>
                                                                        <div className="meme_comment_owner">{elmnt.ownerNickname}</div>
                                                                        <div className="meme_comment_created">{elmnt.created}</div>
                                                                        <div className="meme_comment_content">{elmnt.comment}</div>
                                                                        <div className="meme_comments_rating">rating: {elmnt.ratingAverage}
                                                                        </div>
                                                                    </div>

                                                                )
                                                            })}
                                                        </div>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <div className="meme_card_footer"></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Accordion.Item>
                    </Accordion>

                    {/* COMMENTS */}
                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`Your Comments`}>
                            <div className='accordionContent'>
                                {commentsArr?.map(elmnt => {
                                    return (
                                        <div className='meme_comment_box' key='elmnt.commentId'>
                                            <div onClick={()=>renderPostCommented(elmnt.postId)}>GO TO POST</div>
                                            {/* {renderPostCommented(elmnt.postId)} */}
                                            <div className="meme_comment_owner">{elmnt.ownerNickname}</div>
                                            <div className="meme_comment_created">{elmnt.created}</div>
                                            <div className="meme_comment_content">{elmnt.comment}</div>
                                            <div className="meme_comments_rating">rating: {elmnt.ratingAverage}
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                        </Accordion.Item>
                    </Accordion>

                    {/* ANSWERS */}
                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`Your Answers`}>
                            <div className='accordionContent'>
                                {answersArr?.map(elmnt => {
                                    return (
                                        <div className='meme_comment_box' key='elmnt.commentId'>
                                            <div>GO TO POST</div>
                                            <div className="meme_comment_owner">{elmnt.ownerNickname}</div>
                                            <div className="meme_comment_created">{elmnt.created}</div>
                                            <div className="meme_comment_content">{elmnt.answer}</div>
                                        </div>

                                    )
                                })}
                            </div>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credentials: state.credentials
}))(Profile);