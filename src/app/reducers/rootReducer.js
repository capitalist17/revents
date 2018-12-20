// The rootReducer is going to combine multiple reducers and pass it on to store
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/events/eventReducer';


const rootReducer = combineReducers({
    test: testReducer,
    events: eventReducer,
    form: formReducer
})

export default rootReducer;