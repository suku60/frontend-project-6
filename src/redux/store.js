//Importo métodos propios de redux para generar la store
import { applyMiddleware, createStore } from 'redux';
//Importo métodos propios de redux para guardar y cargar estados en la store
import { save, load } from "redux-localstorage-simple";
//Importo los reducers
import reducer from './reducers';



//Guardo estados que necesito almacenar. En este caso solo está 'credentials' pero si queremos meter más, los metemos separados con comas
const createStoreWithMiddleware = applyMiddleware(
    save({ states: ['credentials', 'profileData'] })
)(createStore);

//Cargo estados que necesito actualizar. En este caso solo está 'credentials' En este caso solo está 'credentials' pero si queremos meter más, los metemos separados con comas
const store = createStoreWithMiddleware(
    reducer,
    load({ states: ['credentials', 'profileData'] }),
    //Esta línea es para que funcione la extensión de Chrome de redux
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    })
);


//Exporto la store para usarla en los renderizados
export default store;