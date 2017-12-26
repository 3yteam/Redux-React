import React,{Component} from "react";

//单选按钮
class RadioButtons extends Component {
    render() {
        return (
            <div>
                <span>请选择年龄</span>
                <input onChange={this.props.handleRadio} name="age" type="radio" value="15"/>15
                <input onChange={this.props.handleRadio} name="age" type="radio" value="22" defaultChecked/>22
                <input onChange={this.props.handleRadio} name="age" type="radio" value="33"/>33
            </div>
        )
    }
}

//多选按钮
class CheckButtons extends Component {

    render(){
        return (
            <div>
                <input onChange={this.props.handleCheckbox} name="like" type="checkbox" value="足球"/> 足球
                <input onChange={this.props.handleCheckbox} name="like" type="checkbox" value="篮球"/> 篮球
                <input onChange={this.props.handleCheckbox} name="like" type="checkbox" value="游泳"/> 游泳
            </div>
        )
    }
}

class FormPage extends Component {

    state =  {
        inputVlaue:'默认用户名',
        selectValue:'A',
        radioValue:'22',
        checkboxValue:[],
        textareaValue:'默认备注内容'
    }
    handleRadio(e){
        this.setState({
            radioValue:e.target.value
        })
    }
    handleCheckbox(e){
        var checks=this.state.checkboxValue.slice();
        var newVal=e.target.value;
        var index=checks.indexOf(newVal);
        if(index == -1){
            checks.push(newVal);
        }else{
            checks.splice(index,1);
        }
        this.setState({
            checkboxValue:checks
        })
    }

    handleSubmit(e){
        e.preventDefault();
        var formData={
            uname:this.refs['uname'].value,
            age:this.refs['age'].value,
            remark:this.refs['remark'].value,
            radioValue:this.state.radioValue,
            checkboxValue:this.state.checkboxValue
        }
        console.log(formData);
    }
    handleChange(event){
        // debugger
        console.log('Uncontrolled change:',event.target.value)
    }
    render() {

        return(
            <div className="form-box">
                <form onSubmit={this.handleSubmit.bind(this)} >
                <input type="text" defaultValue={this.state.uname} ref="uname"/>
                <br/>
                <select defaultValue={this.state.selectValue} ref="age">
                    <option value="A">10-20</option>
                    <option value="B">20-30</option>
                    <option value="C">30-40</option>
                    <option value="D">40-50</option>
                </select>

                <RadioButtons handleRadio={this.handleRadio.bind(this)} />
                <CheckButtons handleCheckbox = {this.handleCheckbox.bind(this)} />
                <textarea defaultValue={this.state.textareaValue} ref="remark"></textarea>


                    Uncontrolled Component:
                    <input type="text" name="name"/>
                    <input type="text"
                           defaultValue='Please type here...' name="age"

                           onChange={this.handleChange.bind(this)}
                    />
                <button type="submit" className="btn-normal">提交</button>
                   </form>
            </div>
        );
    }
}

export default FormPage;
