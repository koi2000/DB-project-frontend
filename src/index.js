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

  <HashRouter>
      <Switch>
        {/*
          <Provider store={store}>
            <App/>
          </Provider>
        */}  

          <Route path="/admin" render={routeProps => <App {...routeProps} />} />
            <Provider store={store}>
              {mainRoutes.map(route => {
                return <Route key={route.path} {...route} />;
              })}
            </Provider>
            <Redirect to={mainRoutes[0].path} from='/*' />
          <Redirect to="/404" />
         
      </Switch>
  </HashRouter>,

  /*<Provider>
    <App/>
  </Provider>,
  */

  
  document.getElementById('root')
);

