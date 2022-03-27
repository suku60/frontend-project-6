import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavigationButton from '../../Components/NavigationButton/NavigationButton';

import './Search.css';

import { ScrollArea, Accordion } from '@mantine/core';

const Search = () => {
    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);
    const [msg, setMsg] = useState("");
    const [searchData, setSearchData] = useState("");

    // stars
    const [star1, setStar1] = useState("gray");
    const [star2, setStar2] = useState("gray");
    const [star3, setStar3] = useState("gray");
    const [star4, setStar4] = useState("gray");
    const [star5, setStar5] = useState("gray");

    // USEEFFECTS
    useEffect(() => {
        // bringMemes();
        // memesRender();

        // console.log("meme?", memes)
    }, [])

    // FUNCTIONS
    // Handlers
    // Local functions

    const OnBackgroundStar = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red")
    }

    const OnBackgroundStar2 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red")
    }

    const OnBackgroundStar3 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red");
        setStar3("red");
    }

    const OnBackgroundStar4 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red");
        setStar3("red");
        setStar4("red");
    }

    const OnBackgroundStar5 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red");
        setStar3("red");
        setStar4("red");
        setStar5("red");
    }


    const OffBackgroundStar = () => {
        if (star1 === "red") {
            setStar1("gray")
            setStar2("gray")
            setStar3("gray")
            setStar4("gray")
            setStar5("gray")
        }
    }
    const fillForm = (e) => {
        setSearchData({ [e.target.name]: e.target.value })
    }


    const search = async () => {
        let results;




        try {
            results = await axios.get(`https://socialmeme.herokuapp.com/posts/actions/find?term=${searchData.term}`)

        } catch (error) {

            console.log("Find endpoint error: ", error)

        }

        if (results.data.length !== 0) {
            setMemes(results.data)
        } else {
            setMsg(results.data)
        }

    }

    const memesRender = () => {
        if (memes.length !== 0) {
            console.log(memes);
            return (
                <ScrollArea className='scrollArea'>
                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`Users results ... +`}>
                            <div className='accordionContent'>
                                {memes.usersResults?.map(elmnt => {
                                    return (
                                        <div className="userResult">{elmnt.nickname}</div>
                                    )
                                })}
                            </div>
                        </Accordion.Item>
                    </Accordion>

                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`Posts results ... +`}>
                            <div className='accordionContent'>
                                {memes.postsResults?.map(elmnt => {
                                    return (

                                        <div className='meme_card' key={elmnt._id}>
                                            <div className='imgDiv'>
                                                <img className='meme_photo' src={elmnt.img} alt={elmnt.title} />
                                            </div>
                                            <div className="meme_name">{elmnt.title}</div>
                                            <div className="meme_rating_action" onMouseOver={() => OffBackgroundStar()}>
                                                <div className="meme_rating_star" style={{ backgroundColor: star1 }} onMouseOver={() => OnBackgroundStar()}>
                                                    <div className="star_white"></div>
                                                </div>
                                                <div className="meme_rating_star" style={{ backgroundColor: star2 }} onMouseOver={() => OnBackgroundStar2()}>
                                                    <div className="star_white"></div>
                                                </div>
                                                <div className="meme_rating_star" style={{ backgroundColor: star3 }} onMouseOver={() => OnBackgroundStar3()}>
                                                    <div className="star_white"></div></div>
                                                <div className="meme_rating_star" style={{ backgroundColor: star4 }} onMouseOver={() => OnBackgroundStar4()}>
                                                    <div className="star_white"></div>
                                                </div>
                                                <div className="meme_rating_star" style={{ backgroundColor: star5 }} onMouseOver={() => OnBackgroundStar5()}>
                                                    <div className="star_white"></div>
                                                </div>
                                            </div>
                                            <div className="meme_rating">rating: {elmnt.ratingAverage}</div>
                                            <div className="meme_creator">meme done by: {elmnt.ownerNickname}</div>
                                            <div className="meme_creator">keywords: {elmnt.keywords.map(keyword =>{
                                                return(
                                                    <span>{keyword} </span>
                                                )
                                            })}</div>
                                        </div>
                                    )
                                })}
                            </div>

                        </Accordion.Item>
                    </Accordion>


                </ScrollArea>
            )

        } else {
            return (
                <></>
            )
        }
    }


    return (
        <div className="container_box" id="search_box">


            {/* FIXED SEARCH TRANSPARENCY  */}
            <div className="container_search_transparency">
                search here
            </div>

            {/* THIS WILL BE A CAROUSEL OF IMAGES */}

            <div className="component_search" id="animationContainerFromTop">

                <div className="login_inputs">

                    <input
                        type="text"
                        placeholder='Introduce term..'
                        name="term"
                        title="nick"
                        autoComplete="off"
                        onChange={(e) => { fillForm(e) }}
                    />
                    <div
                        className="searchBttn"
                        onClick={() => search()}

                    >GO!
                    </div>
                </div>
                {memesRender()}
            </div>
        </div>
    )

}
export default Search;