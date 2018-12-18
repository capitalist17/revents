import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (preloadedState) => {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer];
    const composedEnhancer = compose(...storeEnhancer);

    const store = createStore(rootReducer, preloadedState, composedEnhancer);   

    return store;
}