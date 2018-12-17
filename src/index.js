import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

// const rootEl = document.getElementById('root');

// let render = () => {
//     ReactDOM.render(<App />, rootEl);
// }

// if (module.hot) {
//     module.hot.accept('./App', () => {
//                                         setTimeout(render);
//                                     });
// }

// render(); // This is used for hot module replacement 

// The line below is commented as it does not do hot module replacement
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>    
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister(); // this was default

// serviceWorker.register();
