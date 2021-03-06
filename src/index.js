import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';   
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './app/store/ConfigureStore';
import ScrollToTop from '../src/app/common/util/ScrollToTop';
// import { loadEvents } from './features/events/eventActions';

const store = configureStore();
// store.dispatch(loadEvents()); //Load initial data when the application starts

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store = {store}>
            <BrowserRouter>
                <ScrollToTop>
                    <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut'/>
                    <App/>
                </ScrollToTop>
            </BrowserRouter>    
        </Provider>
        ,document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister(); // this is how it should be in dev env
serviceWorker.register(); // this is how it should be in prod env
