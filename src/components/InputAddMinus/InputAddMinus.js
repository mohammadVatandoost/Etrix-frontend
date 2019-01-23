import React, { Component } from 'react';

class InputAddMinus extends Component {

    state = {
        inputValue: 0
    }
    componentDidMount() {
        this.setState({inputValue: this.props.value});
    }

    // onChange =  (e) => {
    //     console.log("onChange");
    //     console.log(e.target.value);
    //     this.setState({inputValue: e.target.value});
    // }

    render() {
        if(this.props.value > 1) {
            console.log("InputAddMinus number change");
            console.log(this.props.value);
        }
        return (
            <div className="flex-row space-around">
                <button onClick={this.props.minus} type="button" className="btn btn-danger btnNumber btnMinus">-</button>
                <input value={this.props.value} onChange={this.props.onChange} style={{width: "50px"}} min={this.props.min} placeholder={this.props.placeholder} className="form-control" />
                <button onClick={this.props.add} type="button" className="btn btn-success btnNumber btnPlus">+</button>
            </div>
        )
    }
}

export default InputAddMinus;

