//Dependecies
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import GistHome from './pages/GistHome';
import GistsSearchedUser from "./pages/GistsSearchedUser";
import GistContent from "./pages/GistContent";
import UserProfile from "./pages/UserProfile";

//Private routes will only be visible and accessible if a user is logged
const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLogged === true
        ? <Component {...props}{...rest} />
        : <Redirect to='/' />
    )} />
  )

  //create global routes that allow access to some areas of the app regardless of whether the user is logged in or not
const GlobalRoute = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isLogged === false || isLogged === true ? <Component {...props}{...rest} /> : <Redirect to='/' />)}
  />
)
  //via props we control which path belongs to which section of the page, and which functions or global state data it will have access to.
  const Routes = ({isLogged, user, searchedUserGists, loading,searchedUser, userToken}) => {
    return(
      <Switch>
          {/*Public Routes*/}
          <GlobalRoute exact isLogged = {isLogged} path = '/' component={GistHome}/>
          <GlobalRoute exact isLogged = {isLogged} path = '/gist/:id' component={GistContent}/>
          <GlobalRoute exact isLogged = {isLogged} searchedUserGists = {searchedUserGists} loading={loading} searchedUser = {searchedUser} path = "/:searchedUser" component={GistsSearchedUser}/>
          {/*Private Routes*/}
          <PrivateRoute exact isLogged = {isLogged} user = {user} path = '/profile/:user' component={UserProfile} token={userToken}/>
          
      </Switch>
    )
    }
export default Routes; 