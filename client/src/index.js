import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//dev axios helper
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// const survey = {
//     title: 'Trial Title',
//     subject: 'We will appreciate your feedback',
//     recipients: 'oloobico@gmail.com',
//     body: 'We would love to hear if you like our servvices',
// };

// axios.post('/api/survey', survey);
