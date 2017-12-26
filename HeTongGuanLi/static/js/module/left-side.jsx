import React,{Component} from "react";
import {Route, Router,Link} from "react-router";

import {mobileCommon} from  'webJs/common/global-fun'

class HelloBox extends Component {

    constructor(props) {
        super(props);
        this.state={
            userName: ''
        }

        this.fetchData=function(url,callback) {
            mobileCommon.sendAjax({
                        url: url
                    },callback.bind(this));
        }
    }
    componentDidMount() {
        this.fetchData(mobileCommon.interfaceUrl+'login.json',function(response) {
            this.setState({
                userName:response.data.userName
            });
        });

    }
    render() {
        return (
            <div className="hello-box">
                <i className="logo"></i>
                <em><b>{this.state.userName}</b>，你好</em>
            </div>
        );
    }
}

class MainSideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMenu:props.activeMenu,
            menuList:[]
        };
    }
    componentDidMount() {

        mobileCommon.sendAjax({
            url:mobileCommon.interfaceUrl+'menu.json'
        },function(response) {
            this.setState({
                menuList:response.data
             }); 
        }.bind(this))
    }
    render() {
        return(
            <ul className="main-menu">
             {this.state.menuList.map((option,index)=>{
                    return (
                        <li key={index}><Link to={option.toLink}><i className={option.className}></i>{option.menuText}</Link></li>
                        );
                })}

              
            </ul>
        );
    }
}

class LeftSide extends React.Component {
    constructor(props) {
        super(props);
    }
    render()  {
        return (
            <div className="page-frame-out">
            <div className="frame-left">
                <HelloBox/>
                <MainSideMenu/>
             </div>
                <div className="frame-right">
                    {this.props.children}
                </div>

            </div>
        );
    }
}

export  default  LeftSide;