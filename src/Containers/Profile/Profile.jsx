import React, { useEffect, useState, Component } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import NavigationButton from '../../Components/NavigationButton/NavigationButton';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';

import { ScrollArea, Accordion, Modal, Group } from '@mantine/core';
import { SquarePlus, Logout } from 'tabler-icons-react';

import './Profile.css';
import ProfileForm from '../../Components/ProfileForm/ProfileForm';

const Profile = (props) => {
    // let commentedPost = [];


    let navigate = useNavigate();

    // HOOKS
    const [userData, setUserData] = useState(props.credentials.user[0]);
    const [posts, setPosts] = useState([]);
    const [postsCommented, setPostsCommented] = useState([]);
    const [postsAnswered, setPostsAnswered] = useState([]);

    const [commentsArr, setCommentsArr] = useState([]);
    const [answersArr, setAnswersArr] = useState([]);

    const [commentedPost, setCommentedPost] = useState([]);

    const [avatarChanged, setAvatarChanged] = useState(false);

    //Style Hooks
    // post data
    const [postDataDisplay, setPostDataDisplay] = useState("flex");

    //Mantine hooks
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open navigation';

    // useEffect  
    useEffect(() => {


        if (props.credentials?.token === "") {
            navigate("/");
        }

        getUserPostsAndComments();
        setCommentedPost([])

    }, []);

    // FUNCTIONS
    const easeProfileDataOut = () => {
        // document.getElementById("")
        console.log("scrolling")
    }



    const renderAvatar = () => {

        if (props.credentials.user[0].avatar == "") {
            return (
                <div className="container_profile_photo">
                    <div className="addPicture_text">UPDATE AVATAR</div>

                    <Modal
                        opened={opened}
                        onClose={() => {
                            setOpened(false);
                        }}
                    >
                        <ProfileForm></ProfileForm>
                    </Modal>
                    <Group position="center"
                        onClick={() => setOpened(true)}

                    >
                        <SquarePlus
                            size={48}
                            strokeWidth={1}
                            color={'black'}
                            className="addPicture_logo"

                        />
                    </Group>
                </div>
            )
        } else {
            return (
                <div className="container_profile_photo">

                    <Modal
                        opened={opened}
                        onClose={() => {
                            setOpened(false);
                        }}
                    >
                        <ProfileForm></ProfileForm>
                    </Modal>
                    <Group position="center"
                        onClick={() => setOpened(true)}
                    >
                        <div>
                            <img
                                className='avatarImg'
                                src={props.credentials.user[0].avatar}
                                alt=""
                            />
                        </div>
                    </Group>
                </div>
            )
        }
    }

    // Custom accordion display style function
    const HideShowPostData = () => {

        if (postDataDisplay === "flex") {

            setPostDataDisplay("none")
        } else if (postDataDisplay === "none") {

            setPostDataDisplay("flex")

        }


    }

    // Get user posts and comments for displaying into accordions
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

    //Get individual post data and saves into commentedPost hook
    const getPost = async (postId) => {

        let result = await axios.get(`https://socialmeme.herokuapp.com/posts/get?postId=${postId}`);

        setCommentedPost(result.data);

    }

    // Renders commented post if user clicked GO TO POST at a comment
    const renderPostCommented = () => {
        return (
            <>
                {commentedPost?.map(images => {
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
            </>
        )
    }

    // Resets commentedPost hook
    const hideElements = () => {
        setCommentedPost([])
    }

    //If user has bringed a post through its comment, button GoToPost changes
    const renderGoToPostBttn = (elmnt) => {
        if (commentedPost.length <= 0) {
            return (
                <div
                    className='comment_goToPost_bttn'
                    onClick={() => getPost(elmnt.postId)}>GO TO POST
                </div>
            )
        } else {
            return (
                <div
                    className='comment_goToPost_bttn'
                    onClick={() => hideElements(elmnt.postId)}>HIDE POST
                </div>
            )
        }
    }

    const logout= ()=>{
        navigate('/')
        
        setTimeout(()=>{
            props.dispatch({ type: LOGOUT });

            setTimeout(()=>{
                navigate('/')
            },500)
        },500)
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
                <>
                    {renderAvatar()}
                </>
            </div>

            {/* THIS WILL BE A CAROUSEL OF IMAGES */}
            <div className="component_profile">
                <div className='component_profile' id="animationContainerFromTop">
                    <div className='profile_header'>
                        <div className='profile_nickname'>
                            {props.credentials.user[0].nickname}
                        </div>
                        <div className='profile_box_data'>
                            <div className='profile_box_data_div'>
                                <div className='profile_box_data_key'>
                                    EMAIL
                                </div>
                                <div className='profile_box_data_key'>
                                    FOLLOWED
                                </div>
                                {/* <div className='profile_box_data_key'>
                                    FOLLOWERS
                                </div> */}
                            </div>
                            <div className='profile_box_data_div'>
                                <div className='profile_box_data_value'>
                                    {props.credentials.user[0].email}
                                </div>
                                <div className='profile_box_data_value'>
                                    {props.credentials.user[0].followed.length}
                                </div>
                                {/* <div className='profile_box_data_value'>
                                {props.credentials.user[0].followed.length}
                                </div> */}
                            </div>
                        </div>
                    </div>
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
                                <>
                                    {renderPostCommented()}
                                </>
                                {commentsArr?.map(elmnt => {
                                    return (
                                        <div className='meme_comment_box' key='elmnt.commentId'>
                                            <>{renderGoToPostBttn(elmnt)}</>
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
                    <div className='logout_box' onClick={()=>{logout()}}>
                        <Logout
                            size={48}
                            strokeWidth={1}
                            color={'black'}
                        />
                        <span className='logout_text'>LOGOUT</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credentials: state.credentials
}))(Profile);