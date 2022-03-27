import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

import {ReactComponent as StarSvg} from '../../assets/svg/star.svg'

import './Home.css';

const Home = () => {
    let desiredView = useNavigate();

    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);

    // stars
    const [star1, setStar1] = useState("var(--color-vapor-3-1)");
    const [star2, setStar2] = useState("var(--color-vapor-3-1)");
    const [star3, setStar3] = useState("var(--color-vapor-3-1)");
    const [star4, setStar4] = useState("var(--color-vapor-3-1)");
    const [star5, setStar5] = useState("var(--color-vapor-3-1)");

    // USEEFFECTS
    useEffect(()=> {
        bringMemes();

    },[])

    // FUNCTIONS
    // Handlers
    // home refresh handler
    const RefreshHome = () => {
        window.location.reload(false)
    }
    // stars handlers
    const OnBackgroundStar = () =>{
        setStar1("var(--color-vapor-1-3)")
    }

    const OnBackgroundStar2 = () =>{
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)")
    }
    
    const OnBackgroundStar3 = () =>{
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
    }

    const OnBackgroundStar4 = () =>{
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
        setStar4("var(--color-vapor-1-3)");
    }

    const OnBackgroundStar5 = () =>{
        setStar1("var(--color-vapor-1-3)");
        setStar2("var(--color-vapor-1-3)");
        setStar3("var(--color-vapor-1-3)");
        setStar4("var(--color-vapor-1-3)");
        setStar5("var(--color-vapor-1-3)");
    }


    const OffBackgroundStar = () =>{
        if(star1 === "var(--color-vapor-1-3)"){
            setStar1("var(--color-vapor-3-1)")
            setStar2("var(--color-vapor-3-1)")
            setStar3("var(--color-vapor-3-1)")
            setStar4("var(--color-vapor-3-1)")
            setStar5("var(--color-vapor-3-1)")
        }
    }

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
        

{/* FIXED HOME TRANSPARENCY  */}
        <div className="container_home_transparency" onClick={()=>RefreshHome()}>
            <div className="home_transparency_text">
                home
            </div>
            
        </div>
        
{/* THIS WILL BE A CAROUSEL OF IMAGES */}

        <div className="component_home" id="animationContainerFromTop">
            <div className='component_box memes_component'>
            <div className='memes_box'>
                {memes?.map(images => {
                    return (
                         
                    <div className='meme_card' key={images.id}>
                        <img className='meme_photo' src={images.url} alt={images.name}/>
                        <div className="meme_card_data">
                                
                        <div className="meme_name">{images.name}
                        </div>
                        <div className="meme_rating_action" onMouseOver={()=>OffBackgroundStar()}>
                            <div className="meme_rating_star" style={{backgroundColor : star1}} onMouseOver={()=>OnBackgroundStar()}>
                                <StarSvg  style={{backgroundColor : star1}} onMouseOver={()=>OnBackgroundStar()}/>
                                {/* <div className="star_white"></div> */}
                            </div>
                            <div className="meme_rating_star" style={{backgroundColor : star2}} onMouseOver={()=>OnBackgroundStar2()}>
                                    <StarSvg  style={{backgroundColor : star2}} onMouseOver={()=>OnBackgroundStar2()}/>
                            </div>
                            <div className="meme_rating_star" style={{backgroundColor : star3}} onMouseOver={()=>OnBackgroundStar3()}>
                                    <StarSvg  style={{backgroundColor : star3}} onMouseOver={()=>OnBackgroundStar3()}/>
                            </div>                             
                            <div className="meme_rating_star" style={{backgroundColor : star4}} onMouseOver={()=>OnBackgroundStar4()}>
                                <StarSvg  style={{backgroundColor : star4}} onMouseOver={()=>OnBackgroundStar4()}/>
                            </div>
                            <div className="meme_rating_star" style={{backgroundColor : star5}} onMouseOver={()=>OnBackgroundStar5()}>
                                    <StarSvg  style={{backgroundColor : star5}} onMouseOver={()=>OnBackgroundStar5()}/>
                            </div>
                        </div>
                        <div className="meme_rating">rating: {images.box_count}
                        </div>
                        <div className="meme_creator">meme done by: {images.id}
                        </div>
                        <div className="meme_card_footer"></div>
                        </div> 

                    </div>
                )
                })}
            </div>
            </div>
        </div>           
    </div>
    )
}
export default Home;