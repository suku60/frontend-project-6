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
            {props.viewNameDisplay}
        </div>
    )
};

export default NavigationButton;