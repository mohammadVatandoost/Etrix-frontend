import React, {Component} from 'react';
// import './StepProcess.css';

class Step extends Component {


    render() {
        return (
            <li role="presentation" className={this.props.active + " " +this.props.activeAfter}>
                <a className={this.props.activeAfter} aria-controls="discover" role="tab" data-toggle="tab">
                    <i className={"fa "+this.props.icon} aria-hidden="true"></i>
                    <p>{this.props.text}</p>
                </a>
            </li>
        )
    }
}

export default Step;