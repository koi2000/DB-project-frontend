import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'
import { Route } from 'react-router';
import { HashRouter, Switch, Redirect } from 'react-router-dom'
import { mainRoutes } from "./routes";
import {Provider} from 'react-redux'
import store from "./store/index"
ReactDOM.render(
  

  /*<Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" render={routeProps => <App {...routeProps} />} />
        {mainRoutes.map(route => {
          return <Route key={route.path} {...route} />;
        })}
        <Redirect to="/login" from="/" />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
      </Provider>,*/
  /*<div>
    <Router >
      <Switch>
        <Route path="/admin" render={routeProps => <App {...routeProps} />} />
        {mainRoutes.map(route => {
          return <Route key={route.path} {...route} />;
        })}
        <Redirect to="/admin" from="/" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </div>
  
  ,*/

  

  <Provider store={store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  

  
  document.getElementById('root')
);

