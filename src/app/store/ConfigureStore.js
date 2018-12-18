import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer';

export const configureStore = (preloadedState) => {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer];
    // const composedEnhancer = compose(...storeEnhancer);
    const composedEnhancer = composeWithDevTools(...storeEnhancer);

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