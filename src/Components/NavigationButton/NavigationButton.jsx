import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NavigationButton.css';

const NavigationButton = (props) => {

    let desiredView = useNavigate();

    const pathFinder = () => {
        desiredView(props.pathUrl)
    }

    return (
        <div className="temporary_button" onClick={()=>pathFinder()}>
            <div className="navigation_button_icon">{props.buttonIcon}</div>
            <div className="navigation_button_text">{props.viewNameDisplay}</div>
            {/* {props.viewNameDisplay} */}
        </div>
    )
};

export default NavigationButton;