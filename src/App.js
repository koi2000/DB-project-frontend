import React from 'react'
import { Route, Switch, Redirect, HashRouter, BrowserRouter } from 'react-router-dom'
import { mainRoutes } from "./routes";
import { isLogin, loginUser } from './util/api';
import Frame from "./components/frame/Index"
import Login from './pages/login';
function App(props) {
  console.log(isLogin())
  return isLogin() ? (
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
      <div>
     
      <Route path="/*" render={()=><Login/>}></Route>
        
        
        {/*<Redirect to={mainRoutes[0].path}  render={() => {
        return <Login />;
      }} from="/*"/>*/}
      </div>
      
       //<Route path="/*" render={()=><Redirect to="/login"/>}></Route>
    );
}
export default App