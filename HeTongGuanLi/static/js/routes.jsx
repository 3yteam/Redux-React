import React,{Component} from "react";
import {Route, Router, browserHistory, Redirect, IndexRoute} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";

import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

import App from 'webJs/page/App.jsx';
import HomePage from 'webJs/page/Home.jsx';
import AboutPage from 'webJs/page/About.jsx';
import NotFoundPage from 'webJs/page/NotFound.jsx';
import ContractList from 'webJs/page/contract-list.jsx';

import FormPage from 'webJs/page/form-page.jsx';
import SkillShare from 'webJs/page/skill-share.jsx';
import createMessage from 'webJs/page/createMessage.jsx';
import pagination from 'webJs/pageNumber/pagination.jsx';


import Store from 'webJs/Store.jsx';

const createElement=(Component,props)=>{
  return(
    <Provider store={Store}>
      <Component {...props} />
    </Provider>
  );
}

const history = syncHistoryWithStore(browserHistory,Store);
const Routes = ()=>{
  <Router history={history} createElement={createElement}>
    <Route path='/' component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="home" component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
}

export default Routes;
