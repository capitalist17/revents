import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './app/store/ConfigureStore';
import ScrollToTop from '../src/app/common/util/ScrollToTop';
import { loadEvents } from './features/events/eventActions';

const store = configureStore();
store.dispatch(loadEvents());

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <ScrollToTop>
                <App/>
            </ScrollToTop>
        </BrowserRouter>    
    </Provider>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister(); 
