import { logDOM } from '@testing-library/react';
import {SELECT_POST} from '../types';
import {SELECT_COMMENT} from '../types';
import {SELECT_ANSWER} from '../types';

const initialState = {
    post: {},
    comment:{},
    answer:{}
};

const profileDataReducer = (state = initialState, action) => {
    switch(action.type){
        //SAVE SELECTED POST
        case SELECT_POST :
            return {...state, post: action.payload};

            case SELECT_COMMENT :
                // console.log("ESTADO=",state);
                // console.log("PAYLOAD=",action.payload);
            return {...state, comment: action.payload};

            case SELECT_ANSWER :
            return {...state, answer: action.payload};
        default :
            return state
    }
}

export default profileDataReducer;