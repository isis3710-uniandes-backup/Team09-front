import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from '/components/login';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './Auth/history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
            <Route path="/" render={(props) => <Login auth={auth} {...props} />} />
            <Route path="/" render= {(props) => <Profile auth={auth} {...props}/>}/>
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} /> 
            }}/>
        </div>
      </Router>
  );
}