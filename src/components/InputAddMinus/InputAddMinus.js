import React, { Component } from 'react';

class InputAddMinus extends Component {

    render() {
        return (
            <div className="flex-row space-around">
                <button onClick={this.props.minus} type="button" className="btn btn-danger btnNumber btnMinus">-</button>
                <input style={{width: "50px"}} min={this.props.min} placeholder={this.props.placeContent} className="form-control" value={this.props.value}/>
                <button onClick={this.props.add} type="button" className="btn btn-success btnNumber btnPlus">+</button>
            </div>
        )
    }
}

export default InputAddMinus;

