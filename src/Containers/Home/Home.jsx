import React, {useEffect, useState} from 'react';
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';
import './Home.css';

const Home = () => {

return (
    <div className="container_box" id="home_box">

        <div className="login_register_button"></div>

        {/* <Login/> */}
        <Register/>

    </div>
    )
}
export default Home;