import React,{Component} from "react";
import SearchBox from 'webJs/module/search-box';
import {PageView} from 'webJs/components/page-number';
import {mobileCommon} from  'webJs/common/global-fun';
class ContractList extends Component {

     constructor(props) {
        super(props);
        this.state = {
            contractList:[],
            pageIndex:'',
            pageSize:'',
            total:''
        };

    }

    componentDidMount() {
// url:mobileCommon.interfaceUrl+'contract-list.json',
 let that = this;
    this.getData=function() {

            mobileCommon.sendAjax({
                    url:'http://47.92.72.218:8080/brsj/gis/get-contract.htm',
                    type:'GET',
                    data:that.pageViewFun.getParams()
                },function(response) {
                    that.setState({
                        contractList:response.data,
                        pageIndex:response.pageIndex,
                        pageSize:response.pageSize,
                        total:response.total
                     }); 
                    that.pageViewFun.refresh(response.total);

                    that.pageViewFun.enable();
                });
             
        }
 this.pageViewFun = new PageView('#page_view', {
            defaultSize: 10,
            firstDisplay:true,
            lastDisplay:true,
            pageIndexName:'pageIndex',
            pageSizeName:'pageSize',
            onChange: this.getData
        });

        this.pageViewFun.init();
        this.getData();  
      
    }
    render() {
         let trList=[];
         let dataList = this.state.contractList;
        return (
            <div>
                <SearchBox />
                <div className="content-section">
                    <table className="table-list">
                        <thead>
                        <tr>
                            <th className="num-order" width="8%">序号</th>
                            <th width="18%">合同编号</th>
                            <th width="32%">客户</th>
                            <th>内容</th>
                            <th width="11%">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            dataList.map(function(option,index) {
                                return(<tr key={index}>
                                    <td className="num-order">{option.id}</td>
                                    <td>{option.code}</td>
                                    <td>{option.customer}</td>
                                    <td>{option.content}</td>
                                    <td><button className="btn-normal">提醒预约</button> </td>
                                </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

export default  ContractList;


