// The rootReducer is going to combine multiple reducers and pass it on to store
import { combineReducers } from 'redux';
import testReducer from './testReducer';


const rootReducer = combineReducers({
    test : testReducer
})

export default rootReducer;