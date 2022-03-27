import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavigationButton from '../../Components/NavigationButton/NavigationButton';

import './Search.css';

const Search = () => {
    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);
    const [msg, setMsg] = useState("");
    const [searchData, setSearchData] = useState("");

    // USEEFFECTS
    useEffect(() => {
        // bringMemes();
        // memesRender();

        // console.log("meme?", memes)
    }, [])

    // FUNCTIONS
    // Handlers
    // Local functions
    // Axios call to map images
    const fillForm = (e) => {
        setSearchData({ [e.target.name]: e.target.value })
    }


    const search = async () => {
        let results;
        let body = {
            term: searchData.term
        };



        try {

            results = await axios.get(' https://socialmeme.herokuapp.com/posts/actions/find')

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
            if (memes.postsResults.length !== 0) {
                return (
                    <div className='component_box memes_component'>
                        <div className='memes_box'>
                            {memes.postsResults.map(elmnt => {
                                return (
                                    <>
                                        <div className="meme_card" key={elmnt._id}>
                                            <img className='meme_photo' src={elmnt.img} alt={elmnt.title} />
                                            <div className="meme_name">{elmnt.title}</div>
                                            <div className="meme_rating_action">rate me!</div>
                                            {/* <div className="meme_rating">rating: {elmnt.rating}</div> */}
                                            <div className="meme_creator">meme done by: {elmnt.ownerNickname}</div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            }

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