import React,{Component} from "react";
import 'moment';
import 'webJs/components/jquery.daterangepicker-0.0.7.js';


class SearchBox extends Component {
 constructor(props) {
    super(props);
    this.state = {
        startDate:'起始日期',
        endDate:'截止日期',
        info:'请输入',
        content:'00',
        kind:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    inputDate(event) {

        let configObject ={
            format:'YYYY-MM-DD',
            singleDate:true,
            shortcuts:false
        }

        let target = event.target;
        $(target).dateRangePicker(configObject);
    }

    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

        this.setState({
          [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        let data = JSON.stringify(this.state);
        //下面是提交表单的

    };

    componentDidMount() {

           
    }
    render() {
        return(
            <div className="search-box">
                    <form name="searchForm" onSubmit ={this.handleSubmit}>
                        <input type="text" autoFocus="true" name="startDate" className="date start-date" value={this.state.startDate}  onChange={this.handleInputChange} /> -
                        <input type="text" name="endDate" className="date end-date" defaultValue ={this.state.endDate} onChange={this.handleInputChange}  />
                        <input type="text" name="info" className="input-text" defaultValue ={this.state.info} onChange={this.handleInputChange}  />
                        <label htmlFor="agree"><input type="checkbox" name="agree" id="agree" onChange={this.handleInputChange} /> 已签约 </label>

                        <label htmlFor="from01"><input name="from" type="radio" id="form01" value="hebei" onChange={this.handleInputChange}/> 河北</label>
                        <label htmlFor="from02"><input name="from" type="radio" id="form02" value="hubei" onChange={this.handleInputChange}/> 湖北</label>
                        <label htmlFor="from03"><input name="from" type="radio" id="form03" value="beijing" onChange={this.handleInputChange}/> 北京</label>



                        <select defaultValue={this.state.kind} name="kind" onChange={this.handleInputChange}>
                            <option value="0">请选择</option>
                            <option value="A">合同编号</option>
                            <option value="B">客户</option>
                            <option value="C">内容</option>
                        </select>

                        <textarea value={this.state.content } name="content" onChange={this.handleInputChange} style={{"width":"70%","height":"50px"}}  />

                        <button type="submit" className="btn-normal btn-search">搜索</button>
                        <button type="submit" className="btn-normal">全部提醒</button>
                    </form>

            </div>
        );
    }
}

export default SearchBox;
