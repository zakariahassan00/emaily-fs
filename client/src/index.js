import React from "react";
import ReactDOM from "react-dom";

import {createStore , applyMiddleware} from "redux";
import { Provider } from "react-redux"
import reduxThunk from 'redux-thunk'

import App from "./components/App.jsx";
import reducers from "./reducers"

import materializeCSS from "materialize-css/dist/css/materialize.min.css";

const store = createStore(reducers , applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>    
        <App />
    </Provider>
, document.querySelector('#root'));