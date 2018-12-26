// import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../config/firebase';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

// react-redux-firebase (rrf) config 
const rrf_config = {
    userProfile: 'users',        // this tells react-redux-firebase where we are storing the user profile
    attachAuthIsReady: true,    // We have to know when the authentication from firebase is available
    useFirestoreForProfile:true // by default firestore stores the profile info in realtime DB. So,
                                // here we override the default and specifying firestore as our DB.
}

export const configureStore = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer];
    // const composedEnhancer = compose(...storeEnhancer);
    const composedEnhancer = composeWithDevTools(
                                ...storeEnhancer, 
                                reactReduxFirebase(firebase, rrf_config),
                                reduxFirestore(firebase)); // This can do hot reloading

    const store = createStore(rootReducer, preloadedState, composedEnhancer);   

    // The following code is just a copy paste for hot module replacement
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }
    
    return store;
}