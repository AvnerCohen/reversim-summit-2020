import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import Submit from 'containers/Submit';
import MyProposals from 'containers/MyProposals';
import LoginOrRegister from 'components/LoginOrRegister';
import Session from 'containers/Session';
import { openLoginModal } from 'actions/users';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      });
      store.dispatch(openLoginModal());
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={LoginOrRegister} onEnter={redirectAuth} />
        <Route path="/submit" component={Submit} onEnter={requireAuth}/>
        <Route path="/session/:id" component={Session}/>
        <Route path="/my-proposals" component={MyProposals}/>
      </Route>
  );
};
