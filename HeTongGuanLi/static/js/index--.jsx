import 'webStyle/reset.css';
import 'webStyle/layout.css';
import 'webStyle/daterangepicker.css';
import 'webStyle/page-number.css';
import React,{Component} from "react";
import ReactDom from "react-dom";
import {Route, Router, hashHistory, Redirect, IndexRoute} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";

import AppMenu from 'webJs/module/left-side.jsx';
import ContractList from 'webJs/page/contract-list.jsx';
import HomePage from 'webJs/page/Home.jsx';
import FormPage from 'webJs/page/form-page.jsx';
import SkillShare from 'webJs/page/skill-share.jsx';
import createMessage from 'webJs/page/createMessage.jsx';
import pagination from 'webJs/pageNumber/pagination.jsx';



class AppPageContent extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={AppMenu} >
                    <IndexRoute component={HomePage}/>
                    <Route path="form" component={FormPage} />
                    <Route path="skill" component={SkillShare} />
                    <Route path="contract" component={ContractList} />
                    <Route path="pagination" component={pagination} />
                    <Route path="winPop" component={createMessage} />
                </Route>
            </Router>
        );
    }
}
class AppPageFrame extends Component {
    render() {
        return (
            <div>
                <AppPageContent />
            </div>
        );
    }
}
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
});

ReactDom.render(<AppPageFrame />, document.getElementById('webAppPage'));
