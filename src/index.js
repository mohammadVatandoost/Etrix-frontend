import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import * as serviceWorker from './serviceWorker';
import  {Provider}  from "react-redux";
import thunk from "redux-thunk";
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import * as actions from './store/actions/index';
import RouteAPI from './RouteAPI';
import ScrollToTop from './ScrollToTop';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer, cart: cartReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

store.dispatch( actions.authCheckState() );

export default class App extends Component {
    state = {
        test: ''
    }


    render() {
        return (
            <Provider store={store}>
                <Router history={createBrowserHistory()}>
                    <ScrollToTop>
                      <RouteAPI/>
                    </ScrollToTop>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('example'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
