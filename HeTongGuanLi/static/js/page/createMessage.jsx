import React,{Component} from "react";

import createMessTipWin from 'webJs/components/popWindow';



class CreatMessage extends Component {

	popwin(ev) {
		const  param = {
		            tips:"你点点试试！",
		            target:ev.target,
		            hasShade:false,
		            dir:'LT',
		            funcOk:function () {
		            	debugger
		                alert('真2')
		            },
		            funcNo:function () {
		                alert(2)
		            }
		        }
		 createMessTipWin(ev,param); 

	}
	
	render() {
		return(<div className="pop-one" >
			
			<span onClick={this.popwin.bind(this)} style={{'width':'200px','height':'40px','lineHeight':'40px','display':'inline-block','background':'blue','color':'#fff','textAlign':'center','cursor':'pointer'}}> 菜单测试 </span>
		</div>);
	}
}
export default CreatMessage;