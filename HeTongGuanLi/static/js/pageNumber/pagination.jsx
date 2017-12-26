import React, { Component } from 'react';
import PageComponent from 'webJs/pageNumber/pageComponent';
import {mobileCommon} from  'webJs/common/global-fun';
import Mock from 'mockjs';
// import MockApi from 'webJs/pageNumber/mockApi';
class Pagination extends  Component{
    constructor(props){
        super(props);
        this.state = {
            indexList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: 1, //当前页码
            pageSize:5, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
        }
    }
    componentWillMount(){
        var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
        //使用mock模拟数据
        mobileCommon.sendAjax({
            url:mobileCommon.interfaceUrl+'score-list.json',
            type:'GET'
        },function(response) {
            let data = response.data;
            _this.setState({totalData:data})
            _this.setState({totalNum:data.length})
            //计算总页数= 总记录数 / 每页显示的条数
            let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
            _this.setState({totalPage:totalPage})
            _this.pageClick(1);
        });

        // $.ajax({
        //     url:MockApi.getIndexList()+/\/\.json/,
        //     dataType:'json',
        // }).done(function(data){
        //
        // })
    }
    //点击翻页
    pageClick(pageNum) {
        let _this = this;
        if (pageNum != _this.state.current) {
            _this.state.current = pageNum
        }
        _this.state.indexList = [];//清空之前的数据
        for (var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++) {
            if (_this.state.totalData[i]) {
                _this.state.indexList.push(_this.state.totalData[i])
            }
        }
        _this.setState({indexList: _this.state.indexList})
    }
        goNext(){
            var _this = this;
            let cur = _this.state.current;
            //alert(cur+"==="+_this.state.totalPage)
            if(cur < _this.state.totalPage){
                _this.pageClick(cur + 1);
            }}
    goPrevClick(){
        var _this = this;
        let cur = _this.state.current;
        if(cur < _this.state.totalPage){
            _this.pageClick(cur - 1);
        }}

        goSwitchChange(e){
            var _this= this;
            _this.setState({goValue : e.target.value})
            var value = e.target.value;
            //alert(value+"==="+_this.state.totalPage)
            if(!/^[1-9]\d*$/.test(value)){
                alert('页码只能输入大于1的正整数');
            }else if(parseInt(value) > parseInt(_this.state.totalPage)){
                alert('没有这么多页');
            }else{
                _this.pageClick(value);
            }}
        render(){
            return(
                <div>
                <table className="table table-bordered">
                <thead>
                <tr>
                <th>姓名</th>
                <th>分数</th>
                <th>年龄</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.indexList.map(function(data,index){
                    return( <tr key={index}>
                        <td>{data.name}</td>
                    <td>{data.score}</td>
                    <td>{data.age}</td>
                    </tr>
                    )
                })
        }
        </tbody>
            </table>
            <PageComponent  total={this.state.totalNum}
            current={this.state.current}
            totalPage={this.state.totalPage}
            goValue={this.state.goValue}
            pageClick={this.pageClick.bind(this)}
            goPrev={this.goPrevClick.bind(this)}
            goNext={this.goNext.bind(this)}
            switchChange={this.goSwitchChange.bind(this)}/>
        </div>
        )}
    }
    export default Pagination


