import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

import { ReactComponent as StarSvg } from '../../assets/svg/star.svg'
import { Accordion, Group, Button, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Send, ChevronDown } from 'tabler-icons-react';


import { connect } from 'react-redux';
import { UPDATE_CREDENTIALS } from '../../redux/types'

import './Home.css';
import { Helmet } from 'react-helmet';

const Home = (props) => {
    let desiredView = useNavigate();

    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);
    const [page, setPage] = useState(1);

    // stars
    const [star1, setStar1] = useState("var(--color-vapor-3-3");
    const [star2, setStar2] = useState("var(--color-vapor-3-3");
    const [star3, setStar3] = useState("var(--color-vapor-3-3");
    const [star4, setStar4] = useState("var(--color-vapor-3-3");
    const [star5, setStar5] = useState("var(--color-vapor-3-3");

    // topline from memebox
    const topline = useRef(null);

    // post data
    const [postDataDisplay, setPostDataDisplay] = useState("flex");

    // add comment
    const [comment, setComment] = useState("");
    const [answer, setAnswer] = useState("");

    //followed
    const [followed, setFollowed] = useState({});




    // USEEFFECTS
    useEffect(() => {
        if (!props.credentials.token) {
            desiredView("/login");
        }
        bringMemes(1);

    }, [])

    // FUNCTIONS
    // Handlers
    // home refresh handler
    const RefreshHome = () => {
        Element.scrollIntoView.alignToTop(true)
        console.log("scrolling back?")
    }
    // stars handlers
    const OnBackgroundStar = () => {
        setStar1("var(--color-vapor-1-3)")
    }

    const OnBackgroundStar2 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)")
    }

    const OnBackgroundStar3 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
    }

    const OnBackgroundStar4 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
        setStar4("var(--color-vapor-1-3)");
    }

    const OnBackgroundStar5 = () => {
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
        setStar4("var(--color-vapor-1-3)");
        setStar5("var(--color-vapor-1-3)");
    }


    const OffBackgroundStar = () => {
        if (star1 === "var(--color-vapor-1-3)") {
            setStar1("var(--color-vapor-3-3)")
            setStar2("var(--color-vapor-3-3)")
            setStar3("var(--color-vapor-3-3)")
            setStar4("var(--color-vapor-3-3)")
            setStar5("var(--color-vapor-3-3)")
        }
    }

    // bring me back top into memes box
    const scrollToTop = () => {
        topline.current.scrollIntoView()
    }

    // Local functions

    //Load more memes (change page)
    const loadMore = () => {
        bringMemes(page + 1);
    }


    // Axios call to map images
    const bringMemes = async (page) => {

        try {

            let results = await axios.get(`https://socialmeme.herokuapp.com/posts/get10?page=${page}`);

            setMemes(results.data)

        } catch (error) {
            console.log(error)
        }

    }

    // Rating post action
    const ratePost = async (postId, rating) => {
        if (props.credentials.token) {
            let body = {
                postId: postId,
                raterId: props.credentials.user[0]._id,
                raterNickname: props.credentials.user[0].nickname,
                rate: rating
            }
            console.log(body);
            let response = await axios.put(`https://socialmeme.herokuapp.com/posts/actions/addRating`, body);

            console.log(response.data);
            if (response.data !== "You have already rated this post") {
                showNotification({
                    title: `Post rated with ${rating} tomatoes!`,
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            } else {
                showNotification({
                    title: "You have already rated this post",
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            }

        } else {
            showNotification({
                title: 'You must be logged in to rate',
                // message: 'Hey there, your code is awesome! 🤥',
                autoClose: 1000
            })
        }


    }

    // Rating comment action
    const rateComment = async (postId, commentId, rating) => {
        if (props.credentials.token) {
            let body = {
                postId: postId,
                commentId: commentId,
                raterId: props.credentials.user[0]._id,
                raterNickname: props.credentials.user[0].nickname,
                rate: rating
            }
            console.log(body);
            let response = await axios.put(`https://socialmeme.herokuapp.com/posts/actions/addCommentRating`, body);

            console.log(response.data);
            if (response.data !== "You have already rated this comment") {
                showNotification({
                    title: `Comment rated with ${rating} tomatoes!`,
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            } else {
                showNotification({
                    title: "You have already rated this comment",
                    // message: 'Hey there, your code is awesome! 🤥',
                    autoClose: 1000
                })
            }

        } else {
            showNotification({
                title: 'You must be logged in to rate',
                // message: 'Hey there, your code is awesome! 🤥',
                autoClose: 1000
            })
        }


    }

    // const HideShowPostData = () => {

    //     if (postDataDisplay === "flex") {

    //         setPostDataDisplay("none")
    //     } else if (postDataDisplay === "none") {

    //         setPostDataDisplay("flex")

    //     }


    // }

    const clearHooks = () => {

        setComment("");
        setAnswer("");
    }

    //Add comment
    const addComment = async (id) => {

        let body = {
            ownerId: props.credentials.user[0]._id,
            ownerNickname: props.credentials.user[0].nickname,
            comment: comment,
            postId: id,
        }

        axios.put(`https://socialmeme.herokuapp.com/posts/actions/addComment`, body);


        setTimeout(() => {
            bringMemes(1);
            clearHooks();
        }, 1000);

    }

    //Add answer
    const addAnswer = async (postId, commentId) => {

        let body = {

            postId: postId,
            commentId: commentId,
            ownerId: props.credentials.user[0]._id,
            ownerNickname: props.credentials.user[0].nickname,
            answer: answer,
        }

        axios.put(`https://socialmeme.herokuapp.com/posts/actions/addCommentAnswer`, body);


        setTimeout(() => {
            bringMemes(1);
            clearHooks();
        }, 1000);

    }

    //Follow user
    const followUser = async (followedId, followedNickname) => {

        let body = {
            followedId: followedId,
            followedNickname: followedNickname,
            userId: props.credentials.user[0]._id,
        }

        // console.log("BODY", body);
        let result = await axios.put(`https://socialmeme.herokuapp.com/users/actions/follow`, body);

        // console.log("RESULTADO",result.data);

        setFollowed(result.data);
        props.dispatch({ type: UPDATE_CREDENTIALS, payload: result.data });
    }
    //Follow user
    const unfollowUser = async (unfollowedId) => {
        let body = {
            unfollowedId: unfollowedId,
            userId: props.credentials.user[0]._id,
        }

        let result = await axios.put(`https://socialmeme.herokuapp.com/users/actions/unfollow`, body);

        setFollowed(result.data);
        props.dispatch({ type: UPDATE_CREDENTIALS, payload: result.data });
    }

    //Render follow/unfollow Button
    const renderFollowButton = (followedId, followedNickname) => {

        if (props.credentials.token) {
            let arr = props.credentials.user[0].followed;

            let results = arr.filter((elmnt) => elmnt.followedId == followedId);

            if (results.length > 0) {
                return (
                    <div
                        className='unfollow'
                        onClick={() => { unfollowUser(followedId) }}
                    >UNFOLLOW
                    </div>
                )
            } else {
                return (
                    <div
                        className='follow'
                        onClick={() => { followUser(followedId, followedNickname) }}
                    >FOLLOW
                    </div>
                )
            }
        } else {
            return (
                <div
                    className='unfollow'
                >LOGIN TO FOLLOW
                </div>
            )
        }



    }

    return (
        <div className="container_box" id="home_box">
            <div>
                <Helmet>
                    <title>tomeme | Home</title>
                </Helmet>
            </div>


            {/* FIXED HOME TRANSPARENCY  */}
            {/* THIS WILL BE A CAROUSEL OF IMAGES */}

            <div className="component_home" id="animationContainerFromTop">
                <div className='component_box memes_component'>
                    <div className='memes_box' style={{ transition: ".3s" }}>
                        <div ref={topline} className="home_topline">
                        </div>
                        <div className="container_home_transparency" onClick={scrollToTop}>
                            <div className="home_transparency_text">
                                t o p
                            </div>
                        </div>
                        {memes?.map(images => {
                            return (

                                <div className='meme_card' key={images._id}>
                                    <img className='meme_photo' src={images.img} alt={images.title} />
                                    <div className="meme_card_data">

                                        <Accordion
                                            className='meme_comments_accordion'
                                            icon={<ChevronDown size={20} />}
                                            iconPosition="right"
                                            offsetIcon={false}
                                        >
                                            {/* <Accordion className='meme_comments_accordion' iconPosition="right" iconSize={0} offsetIcon={false} onClick={() => HideShowPostData()}> */}
                                            <Accordion.Item label={`Comments`}>
                                                <div className='accordionContent'>
                                                    <div className='meme_comment_textarea_box'>
                                                        <Textarea
                                                            className="meme_comment_textarea"
                                                            label="add comment "
                                                            autosize
                                                            minRows={2}
                                                            maxRows={4}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            value={comment}
                                                        />
                                                        <div
                                                            className="meme_comment_textarea_bttn"
                                                            onClick={() => addComment(images._id)}

                                                        ><Send
                                                                size={48}
                                                                strokeWidth={1.5}
                                                                color={'black'}
                                                            />
                                                        </div>
                                                    </div>
                                                    {images?.comments?.map(elmnt => {

                                                        return (
                                                            <div className='meme_comment_box' key={elmnt.commentId}>
                                                                <div className="meme_comment_owner">{elmnt.ownerNickname}</div>
                                                                <div className="meme_comment_created">{elmnt.created}</div>
                                                                <div className="meme_comment_content">{elmnt.comment}</div>
                                                                <div className="meme_comment_rating_action" onMouseOver={() => OffBackgroundStar()}>
                                                                    <div
                                                                        className="meme_comment_rating_star"
                                                                        style={{ backgroundColor: star1 }}
                                                                        onMouseOver={() => OnBackgroundStar()}
                                                                        onClick={() => { rateComment(images._id, elmnt.commentId, 1) }}
                                                                    >
                                                                        <StarSvg
                                                                            style={{ backgroundColor: star1 }}
                                                                            onMouseOver={() => OnBackgroundStar()}
                                                                        />
                                                                        {/* <div className="star_white"></div> */}
                                                                    </div>
                                                                    <div
                                                                        className="meme_comment_rating_star"
                                                                        style={{ backgroundColor: star2 }}
                                                                        onMouseOver={() => OnBackgroundStar2()}
                                                                        onClick={() => { rateComment(images._id, elmnt.commentId, 2) }}
                                                                    >
                                                                        <StarSvg
                                                                            style={{ backgroundColor: star2 }}
                                                                            onMouseOver={() => OnBackgroundStar2()}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="meme_comment_rating_star"
                                                                        style={{ backgroundColor: star3 }}
                                                                        onMouseOver={() => OnBackgroundStar3()}
                                                                        onClick={() => { rateComment(images._id, elmnt.commentId, 3) }}
                                                                    >
                                                                        <StarSvg
                                                                            style={{ backgroundColor: star3 }}
                                                                            onMouseOver={() => OnBackgroundStar3()}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="meme_comment_rating_star"
                                                                        style={{ backgroundColor: star4 }}
                                                                        onMouseOver={() => OnBackgroundStar4()}
                                                                        onClick={() => { rateComment(images._id, elmnt.commentId, 4) }}
                                                                    >
                                                                        <StarSvg
                                                                            style={{ backgroundColor: star4 }}
                                                                            onMouseOver={() => OnBackgroundStar4()}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="meme_comment_rating_star"
                                                                        style={{ backgroundColor: star5 }}
                                                                        onMouseOver={() => OnBackgroundStar5()}
                                                                        onClick={() => { rateComment(images._id, elmnt.commentId, 5) }}
                                                                    >
                                                                        <StarSvg
                                                                            style={{ backgroundColor: star5 }}
                                                                            onMouseOver={() => OnBackgroundStar5()}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="meme_comments_rating">rating: {elmnt.ratingAverage}
                                                                </div>
                                                                <Accordion
                                                                    className='meme_answers_accordion'
                                                                    icon={<ChevronDown size={20} />}
                                                                    iconPosition="right"
                                                                    offsetIcon={false}>
                                                                    <Accordion.Item label={`Answers`}>
                                                                        <div className='accordionContent'>
                                                                            <div className='meme_comment_textarea_box'>
                                                                                <Textarea
                                                                                    className="meme_comment_textarea"
                                                                                    label="New answer"
                                                                                    autosize
                                                                                    minRows={2}
                                                                                    maxRows={4}
                                                                                    onChange={(e) => setAnswer(e.target.value)}
                                                                                    value={answer}
                                                                                />
                                                                                <div
                                                                                    className="meme_comment_textarea_bttn"
                                                                                    onClick={() => addAnswer(images._id, elmnt.commentId)}

                                                                                ><Send
                                                                                        size={48}
                                                                                        strokeWidth={1.5}
                                                                                        color={'black'}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            {elmnt.answers?.map(elmnt2 => {
                                                                                return (
                                                                                    <div className='meme_answer_box' key={elmnt2.answerId}>
                                                                                        <div className="meme_comment_owner">{elmnt2.ownerNickname}</div>
                                                                                        <div className="meme_comment_created">{elmnt2.created}</div>
                                                                                        <div className="meme_comment_content">{elmnt2.answer}</div>
                                                                                    </div>

                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </div>

                                                        )
                                                    })}
                                                </div>
                                            </Accordion.Item>
                                        </Accordion>
                                        <div className="meme_title" style={{ display: postDataDisplay }}>{images.title}
                                        </div>
                                        <div className="meme_description" style={{ display: postDataDisplay }}>{images.text}
                                        </div>
                                        <div className="meme_rating_action" style={{ display: postDataDisplay }} onMouseOver={() => OffBackgroundStar()}>
                                            <div
                                                className="meme_rating_star"
                                                style={{ backgroundColor: star1 }}
                                                onMouseOver={() => OnBackgroundStar()}
                                                onClick={() => { ratePost(images._id, 1) }}
                                            >
                                                <StarSvg
                                                    style={{ backgroundColor: star1 }}
                                                    onMouseOver={() => OnBackgroundStar()}

                                                />
                                                {/* <div className="star_white"></div> */}
                                            </div>
                                            <div
                                                className="meme_rating_star"
                                                style={{ backgroundColor: star2 }}
                                                onMouseOver={() => OnBackgroundStar2()}
                                                onClick={() => { ratePost(images._id, 2) }}
                                            >
                                                <StarSvg
                                                    style={{ backgroundColor: star2 }}
                                                    onMouseOver={() => OnBackgroundStar2()}
                                                />
                                            </div>
                                            <div
                                                className="meme_rating_star"
                                                style={{ backgroundColor: star3 }}
                                                onMouseOver={() => OnBackgroundStar3()}
                                                onClick={() => { ratePost(images._id, 3) }}
                                            >
                                                <StarSvg
                                                    style={{ backgroundColor: star3 }}
                                                    onMouseOver={() => OnBackgroundStar3()}
                                                />
                                            </div>
                                            <div
                                                className="meme_rating_star"
                                                style={{ backgroundColor: star4 }}
                                                onMouseOver={() => OnBackgroundStar4()}
                                                onClick={() => { ratePost(images._id, 4) }}
                                            >
                                                <StarSvg
                                                    style={{ backgroundColor: star4 }}
                                                    onMouseOver={() => OnBackgroundStar4()}
                                                />
                                            </div>
                                            <div
                                                className="meme_rating_star"
                                                style={{ backgroundColor: star5 }}
                                                onMouseOver={() => OnBackgroundStar5()}
                                                onClick={() => { ratePost(images._id, 5) }}
                                            >
                                                <StarSvg
                                                    style={{ backgroundColor: star5 }}
                                                    onMouseOver={() => OnBackgroundStar5()}
                                                />
                                            </div>
                                        </div>
                                        <div className="meme_rating" style={{ display: postDataDisplay }}>rating: {images.ratingAverage}
                                        </div>
                                        <div
                                            className="meme_creator"
                                            style={{ display: postDataDisplay }}>
                                            author: {images.ownerNickname}
                                            {/* <div
                                                className='follow'
                                                onClick={() => { followUser(images.ownerId, images.ownerNickname) }}
                                            >FOLLOW
                                            </div> */}
                                            {renderFollowButton(images.ownerId, images.ownerNickname)}
                                            {/* <div
                                                className='unfollow'
                                                onClick={() => { unfollowUser(images.ownerId) }}
                                            >UNFOLLOW
                                            </div> */}
                                        </div>
                                        <div className="meme_card_footer"></div>
                                    </div>
                                </div>
                            )
                        })}
                        <div
                            className='memes_loadMore_bttn'
                            onClick={() => { loadMore() }}
                        >Load More</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credentials: state.credentials
}))(Home);