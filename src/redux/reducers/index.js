
import {combineReducers} from 'redux';


import credentials from './loginData-reducer';
import profileData from './profileData-reducer';


//Aquí metería todos los reducers importados para combinarlos
const rootReducer = combineReducers({

    credentials,
    profileData

});


//Exporto rootReducer con todos los reducers combinados
export default rootReducer;