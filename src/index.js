import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }     from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store }  from './utils/store';
import Home from './home';
import Login from './components/login/login'
import Signup from './components/login/signup'

ReactDOM.render(
  <Provider store={store}>
         <Router basename="/tweet_clone">
            <Route exact path="/" component={Login}/>
            <Route  path="/home" component={Home}/>
            <Route  path="/signup" component={Signup}/>
          </Router>
  </Provider>,
  document.getElementById('root')
);

