import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TemporaryButton from '../../Components/TemporaryButton/TemporaryButton';

import './Search.css';

const Search = () => {
    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);
    const [users, setUsers] = useState([]);

    // USEEFFECTS
    useEffect(() => {
        // bringMemes();

        // console.log("meme?", memes)
    }, [])

    // FUNCTIONS
    // Handlers
    // Local functions
    // Axios call to map images
    const search = async () => {



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
                    />
                    <div
                        className="searchBttn"
                        onClick={() => search()}

                    >GO!
                    </div>
                </div>
                <div className='component_box memes_component'>
                    <div className='memes_box'>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Search;