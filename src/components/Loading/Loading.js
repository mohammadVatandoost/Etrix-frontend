import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class Loading extends Component {
    state = {

    }

    componentDidMount() {
    }

    render() {


        return (
            <div className="container" style={{direction: 'rtl', padding: '4%'}}>
                <ClipLoader loaderStyle={{size: '200'}} color={'#123abc'} loading="true" />
            </div>
        )
    }
}


export default Loading;

