import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { mainRoutes } from "./routes";
import { loginUser } from './util/api';
import Frame from "./components/frame/Index"
function App(props) {
  console.log(loginUser())
  return (
    
    loginUser() ? (
      
        <Switch>
          {mainRoutes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                //exact={route.exact}
                render={routeProps => {
                  return <route.component {...routeProps} />;
                }}
              />
            );
          })}
          <Redirect to={mainRoutes[0].path} from='/' />
          <Redirect to="/404" />
        </Switch>
      
    ):
    (
        <Redirect to="/login" />
    )
     
  );
}
export default App