import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

import { ReactComponent as StarSvg } from '../../assets/svg/star.svg'
import { Accordion } from '@mantine/core';

import './Home.css';

const Home = () => {
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

    // USEEFFECTS
    useEffect(() => {
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


            // console.log("less?", lessMemes)

            console.log("soy yo", results.data)
            setMemes(results.data)

            // console.log("memes¿", memes)

            // setMemes(memeResponse.data.results)


        } catch (error) {
            console.log(error)
        }

    }

    // console.log("mememess?", memes)

    return (
        <div className="container_box" id="home_box">


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

                                        <div className="meme_name">{images.title}
                                        </div>
                                        <div className="meme_name">{images.text}
                                        </div>
                                        <div className="meme_rating_action" onMouseOver={() => OffBackgroundStar()}>
                                            <div className="meme_rating_star" style={{ backgroundColor: star1 }} onMouseOver={() => OnBackgroundStar()}>
                                                <StarSvg style={{ backgroundColor: star1 }} onMouseOver={() => OnBackgroundStar()} />
                                                {/* <div className="star_white"></div> */}
                                            </div>
                                            <div className="meme_rating_star" style={{ backgroundColor: star2 }} onMouseOver={() => OnBackgroundStar2()}>
                                                <StarSvg style={{ backgroundColor: star2 }} onMouseOver={() => OnBackgroundStar2()} />
                                            </div>
                                            <div className="meme_rating_star" style={{ backgroundColor: star3 }} onMouseOver={() => OnBackgroundStar3()}>
                                                <StarSvg style={{ backgroundColor: star3 }} onMouseOver={() => OnBackgroundStar3()} />
                                            </div>
                                            <div className="meme_rating_star" style={{ backgroundColor: star4 }} onMouseOver={() => OnBackgroundStar4()}>
                                                <StarSvg style={{ backgroundColor: star4 }} onMouseOver={() => OnBackgroundStar4()} />
                                            </div>
                                            <div className="meme_rating_star" style={{ backgroundColor: star5 }} onMouseOver={() => OnBackgroundStar5()}>
                                                <StarSvg style={{ backgroundColor: star5 }} onMouseOver={() => OnBackgroundStar5()} />
                                            </div>
                                        </div>
                                        <div className="meme_rating">rating: {images.ratingAverage}
                                        </div>
                                        <div className="meme_creator">meme done by: {images.ownerNickname}
                                        </div>
                                        <Accordion className='meme_comments_accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                                            <Accordion.Item label={`Comments`}>
                                                <div className='accordionContent'>
                                                    {images.comments.map(elmnt => {
                                                        return (
                                                            <div className='meme_comment_box' key='elmnt.commentId'>
                                                                <div className="meme_comment_owner">{elmnt.ownerNickname}</div>
                                                                <div className="meme_comment_created">{elmnt.created}</div>
                                                                <div className="meme_comment_content">{elmnt.comment}</div>
                                                                <div className="meme_comment_rating_action" onMouseOver={() => OffBackgroundStar()}>
                                                                    <div className="meme_comment_rating_star" style={{ backgroundColor: star1 }} onMouseOver={() => OnBackgroundStar()}>
                                                                        <StarSvg style={{ backgroundColor: star1 }} onMouseOver={() => OnBackgroundStar()} />
                                                                        {/* <div className="star_white"></div> */}
                                                                    </div>
                                                                    <div className="meme_comment_rating_star" style={{ backgroundColor: star2 }} onMouseOver={() => OnBackgroundStar2()}>
                                                                        <StarSvg style={{ backgroundColor: star2 }} onMouseOver={() => OnBackgroundStar2()} />
                                                                    </div>
                                                                    <div className="meme_comment_rating_star" style={{ backgroundColor: star3 }} onMouseOver={() => OnBackgroundStar3()}>
                                                                        <StarSvg style={{ backgroundColor: star3 }} onMouseOver={() => OnBackgroundStar3()} />
                                                                    </div>
                                                                    <div className="meme_comment_rating_star" style={{ backgroundColor: star4 }} onMouseOver={() => OnBackgroundStar4()}>
                                                                        <StarSvg style={{ backgroundColor: star4 }} onMouseOver={() => OnBackgroundStar4()} />
                                                                    </div>
                                                                    <div className="meme_comment_rating_star" style={{ backgroundColor: star5 }} onMouseOver={() => OnBackgroundStar5()}>
                                                                        <StarSvg style={{ backgroundColor: star5 }} onMouseOver={() => OnBackgroundStar5()} />
                                                                    </div>
                                                                </div>
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
                        <div 
                        className='memes_loadMore_bttn'
                        onClick={() => {loadMore()}}
                        >Load More</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;