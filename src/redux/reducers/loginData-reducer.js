//Importo los types para este reducer
import { LOGIN, LOGOUT, UPDATE_CREDENTIALS } from '../types';

//Declaro las variables y su estado inicial antes de la acción. No tienen por qué llamarse igual que las que llegan desde el backend
const initialState = {
    token: '',
    user: {}
};


//Función reducer: retorno una cosa u otra según el type que se esté ejecutando
const reducerLoginData = (state = initialState, action) => {
    switch (action.type) {
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case LOGIN:
            return action.payload;

        //BORRAMOS DATOS GUARDADOS DE USUARIO LOGUEADO Y DEJAMOS VALORES VACIOS
        case LOGOUT:
            return initialState;

        //ACTUALIZAMOS DATOS DE USUARIO CON LO QUE NOS LLEGA DE USERMODFORM
        case UPDATE_CREDENTIALS:
            return {...state, user: action.payload}

        default:
            return state
    }
}

//Exporto la función reducer
export default reducerLoginData;