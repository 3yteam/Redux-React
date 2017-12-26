import React,{Component} from "react";
import {Route, Router,Link} from "react-router";
import {mobileCommon} from  'webJs/common/global-fun';
// 展示组件与容器组件

// 展示组件
class SkillListShow extends Component {

    constructor(props) {
        super(props);
    }
    getList()  {
        var skillsList=  this.props.skillsOpt.map(function(key,option) {
            return (<li>{option.title}</li>);
        })
        return skillsList;
    }
    render() {
        console.log(this.props.skillsOpt);
        return (<ul className="skill-list">{this.props.skillsOpt.map(function(option,index) {
            console.log(index);
            return (<li key={index}><a href={option.url}  target="_blank">{option.title}</a></li>);
            })
        }</ul>)
    }

}

// 容器组件
class SkillsPage extends  Component {
    constructor() {
        super();
        this.state = { skillList: [] }
    }
    componentWillMount() {
    }
    componentDidMount() {
            mobileCommon.sendAjax({
                url:mobileCommon.interfaceUrl+'skills-list.json',
                type:'GET'
            },function(response) {
                this.setState({
                    skillList:response.data
                });
            }.bind(this));
    }

    render() {
        return (<div><SkillListShow skillsOpt={this.state.skillList} name="lanyan" /></div>);


    }
}



export default SkillsPage;
