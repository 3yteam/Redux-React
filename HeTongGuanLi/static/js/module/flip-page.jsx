import React,{Component} from "react";
import PageView from 'webJs/components/page-number';

class FlipPage extends Component {

	   pageView = new PageView('#page_view', {
            defaultSize: 10,
            firstDisplay:true,
            lastDisplay:true,
            pageIndexName:'pageIndex',
            pageSizeName:'pageSize',
            onChange: getData
        });
        

	render() {
    return(
	        <div className="page_wrapper">
	            <ul id="page_view" className="page_view">
	            </ul>
	        </div>
	    );
	}

}

export default FlipPage;
