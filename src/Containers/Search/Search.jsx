import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Search.css';

import { ScrollArea, Accordion } from '@mantine/core';

const Search = () => {
    // HOOKS
    // memes
    const [memesSearch, setMemesSearch] = useState([]);
    const [msg, setMsg] = useState("");
    const [searchData, setSearchData] = useState("");

    // stars
    const [starSearch1, setStarSearch1] = useState("gray");
    const [starSearch2, setStarSearch2] = useState("gray");
    const [starSearch3, setStarSearch3] = useState("gray");
    const [starSearch4, setStarSearch4] = useState("gray");
    const [starSearch5, setStarSearch5] = useState("gray");

    // USEEFFECTS
    useEffect(() => {
        // bringMemes();
        // memesRender();

        // console.log("meme?", memes)
    }, [])

    // FUNCTIONS
    // Handlers
    // Local functions

    const OnBackgroundStarSearch = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStarSearch1("red")
    }

    const OnBackgroundStarSearch2 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStarSearch1("red");
        setStarSearch2("red")
    }

    const OnBackgroundStarSearch3 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStarSearch1("red");
        setStarSearch2("red");
        setStarSearch3("red");
    }

    const OnBackgroundStarSearch4 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStarSearch1("red");
        setStarSearch2("red");
        setStarSearch3("red");
        setStarSearch4("red");
    }

    const OnBackgroundStarSearch5 = () => {
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStarSearch1("red");
        setStarSearch2("red");
        setStarSearch3("red");
        setStarSearch4("red");
        setStarSearch5("red");
    }


    const OffBackgroundStarSearch = () => {
        if (starSearch1 === "red") {
            setStarSearch1("gray")
            setStarSearch2("gray")
            setStarSearch3("gray")
            setStarSearch4("gray")
            setStarSearch5("gray")
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
            setMemesSearch(results.data)
        } else {
            setMsg(results.data)
        }

    }

    const memesRender = () => {
        if (memesSearch.length !== 0) {
            console.log(memesSearch);
            return (
                <ScrollArea className='scrollArea'>
                    <Accordion className='accordion' iconPosition="right" iconSize={0} offsetIcon={false}>
                        <Accordion.Item label={`Users results ... +`}>
                            <div className='accordionContent'>
                                {memesSearch.usersResults?.map(elmnt => {
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
                                {memesSearch.postsResults?.map(elmnt => {
                                    return (

                                        <div className='search_meme_card' key={elmnt._id}>
                                            <div className='imgDiv'>
                                                <img className='search_meme_photo' src={elmnt.img} alt={elmnt.title} />
                                            </div>
                                            <div className="search_meme_name">{elmnt.title}</div>
                                            <div className="search_meme_rating_action" onMouseOver={() => OffBackgroundStarSearch()}>
                                                <div className="search_meme_rating_star" style={{ backgroundColor: starSearch1 }} onMouseOver={() => OnBackgroundStarSearch()}>
                                                    <div className="search_star_white"></div>
                                                </div>
                                                <div className="search_meme_rating_star" style={{ backgroundColor: starSearch2 }} onMouseOver={() => OnBackgroundStarSearch2()}>
                                                    <div className="search_star_white"></div>
                                                </div>
                                                <div className="search_meme_rating_star" style={{ backgroundColor: starSearch3 }} onMouseOver={() => OnBackgroundStarSearch3()}>
                                                    <div className="search_star_white"></div></div>
                                                <div className="search_meme_rating_star" style={{ backgroundColor: starSearch4 }} onMouseOver={() => OnBackgroundStarSearch4()}>
                                                    <div className="search_star_white"></div>
                                                </div>
                                                <div className="search_meme_rating_star" style={{ backgroundColor: starSearch5 }} onMouseOver={() => OnBackgroundStarSearch5()}>
                                                    <div className="search_star_white"></div>
                                                </div>
                                            </div>
                                            <div className="search_meme_rating">rating: {elmnt.ratingAverage}</div>
                                            <div className="search_meme_creator">meme done by: {elmnt.ownerNickname}</div>
                                            <div className="search_meme_creator">keywords: {elmnt.keywords.map(keyword =>{
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

                <div className="searchbar_container">

                    <input
                        type="text"
                        placeholder='Search in Tomeme'
                        name="term"
                        title="nick"
                        autoComplete="off"
                        id="search_input"
                        onChange={(e) => { fillForm(e) }}
                    />
                    <div
                        className="search_button"
                        onClick={() => search()}

                    >Search
                    </div>
                </div>
                {memesRender()}
            </div>
        </div>
    )

}
export default Search;