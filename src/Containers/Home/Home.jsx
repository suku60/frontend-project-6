import React, {useEffect, useState} from 'react';
import axios from 'axios';

import TemporaryButton from '../../Components/TemporaryButton/TemporaryButton';

import './Home.css';

const Home = () => {
    // HOOKS
    // memes
    const [memes, setMemes] = useState([]);

    // stars
    const [star1, setStar1] = useState("gray");
    const [star2, setStar2] = useState("gray");
    const [star3, setStar3] = useState("gray");
    const [star4, setStar4] = useState("gray");
    const [star5, setStar5] = useState("gray");

    // USEEFFECTS
    useEffect(()=> {
        bringMemes();

        // console.log("meme?", memes)
    },[])

    // FUNCTIONS
    // Handlers

    const OnBackgroundStar = () =>{
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red")
    }

    const OnBackgroundStar2 = () =>{
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red")
    }
    
    const OnBackgroundStar3 = () =>{
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red");
        setStar3("red");
    }

    const OnBackgroundStar4 = () =>{
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red");
        setStar3("red");
        setStar4("red");
    }

    const OnBackgroundStar5 = () =>{
        // document.getElementById("s1").style.backgroundColor = "red !important";
        setStar1("red");
        setStar2("red");
        setStar3("red");
        setStar4("red");
        setStar5("red");
    }


    const OffBackgroundStar = () =>{
        if(star1 === "red"){
            setStar1("gray")
            setStar2("gray")
            setStar3("gray")
            setStar4("gray")
            setStar5("gray")
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
        <div className="container_home_transparency">
            home here
        </div>
        
{/* THIS WILL BE A CAROUSEL OF IMAGES */}

        <div className="component_home" id="animationContainerFromTop">
            <div className='component_box memes_component'>
            <div className='memes_box'>
                {memes?.map(images => {
                    return (
                         
                     <div className='meme_card' key={images.id}>
                         <img className='meme_photo' src={images.url} alt={images.name}/>
                         <div className="meme_name">{images.name}</div>
                         <div className="meme_rating_action" onMouseOver={()=>OffBackgroundStar()}>
                             <div className="meme_rating_star" style={{backgroundColor : star1}} onMouseOver={()=>OnBackgroundStar()}>
                                 <div className="star_white"></div>
                             </div>
                             <div className="meme_rating_star" style={{backgroundColor : star2}} onMouseOver={()=>OnBackgroundStar2()}>
                                 <div className="star_white"></div>
                             </div>
                             <div className="meme_rating_star" style={{backgroundColor : star3}} onMouseOver={()=>OnBackgroundStar3()}>
                                 <div className="star_white"></div></div>                             
                             <div className="meme_rating_star" style={{backgroundColor : star4}} onMouseOver={()=>OnBackgroundStar4()}>
                                 <div className="star_white"></div>
                             </div>
                             <div className="meme_rating_star" style={{backgroundColor : star5}} onMouseOver={()=>OnBackgroundStar5()}>
                                 <div className="star_white"></div>
                             </div>
                         </div>
                         <div className="meme_rating">rating: {images.box_count}</div>
                         <div className="meme_creator">meme done by: {images.id}</div>
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