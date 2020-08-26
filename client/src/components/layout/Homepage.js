import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Homepage from './components/layout/Homepage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Posts from './components/posts/Posts';
import Pubs from './components/pubs/Pubs';
import SinglePost from './components/posts/SinglePost';
import SinglePub from './components/pubs/SinglePub';


import './app.scss';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// Check for existing auth token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Homepage} />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={SinglePost} />
          <Route exact path="/pubs" component={Pubs} />
          <Route exact path="/pubs/:id" component={SinglePub} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;