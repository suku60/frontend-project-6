
import {combineReducers} from 'redux';


import credentials from './loginData-reducer';


//Aquí metería todos los reducers importados para combinarlos
const rootReducer = combineReducers({

    credentials

});


//Exporto rootReducer con todos los reducers combinados
export default rootReducer;