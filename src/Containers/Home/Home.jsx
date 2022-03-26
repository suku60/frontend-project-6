import React, {useEffect, useState} from 'react';
import axios from 'axios';

import TemporaryButton from '../../Components/TemporaryButton/TemporaryButton';

import './Home.css';

const Home = () => {
    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);

    // USEEFFECTS
    useEffect(()=> {
        bringMemes();

        // console.log("meme?", memes)
    },[])

    // FUNCTIONS
    // Handlers
    // Local functions
    // Axios call to map images
    const bringMemes = async () => {

        try {

            let memeResponse = await axios.get('https://api.imgflip.com/get_memes');

            // console.log("memeresponsee here", memeResponse)
            
            // console.log("memeresponsee 2 here", memeResponse.data.data)


            let lessMemes = memeResponse.data.data.memes.slice(0, 10)

            // console.log("less?", lessMemes)


            setMemes(lessMemes)

            // console.log("memes¿", memes)

            // setMemes(memeResponse.data.results)


        }catch(error){
            console.log(error)
        }

    }

    // console.log("mememess?", memes)

return (
    <div className="container_box" id="home_box">

        {/* TEMPORARY SCREEN SWITCH BUTTONS */}

        <TemporaryButton viewNameDisplay={"profile"} pathUrl={"/profile"}/>
        <TemporaryButton viewNameDisplay={"login"} pathUrl={"/"}/>

{/* THIS WILL BE A CAROUSEL OF IMAGES */}

        {/* <div className="component_home">
            <div className='component_box memes_component' id="animationContainerFromTop">
            <div className='memes_box'>
                {memes?.map(images => {
                    return (
                         
                     <div className='meme_card' key={images.id}>
                         <img className='meme_photo' src={images.url} alt={images.name}/>
                         <div className="meme_name">{images.name}</div>
                         <div className="meme_rating_acton">rate me!</div>
                         <div className="meme_rating">rating: {images.box_count}</div>
                         <div className="meme_creator">meme done by: {images.id}</div>
                     </div>
                )
                })}
            </div>
            </div>
        </div>            */}
    </div>
    )
}
export default Home;