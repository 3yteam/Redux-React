import React,{Component} from "react";
import {connect} from 'react-redux';

const Home = ({greeting})=>{
  return (
  <div>
    <div >Home</div>
    <div >{greeting}</div>
  </div>
  );
};

const mapStateToProps = (state)=>({
    greeting:'ooo'
});

export default connect(mapStateToProps)(Home);
