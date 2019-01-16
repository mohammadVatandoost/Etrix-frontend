import React, { Component } from 'react';

class OrderUNCompleted extends Component {
    state = {

    }

    componentDidMount() {
    }

    render() {


        return (
            <div className="container" style={{direction: 'rtl', padding: '4%'}}>
                <h2 className="text-center"> پرداخت شما با مشکل روبرو شده است، لطفا دوباره امتحان کنید. </h2>
                <h2 className="text-center"> اگر پولی از حساب شما کسر شده است ، صبر کنید تا 3 روز آینده به حساب شما بر می گردد. </h2>
            </div>
        )
    }
}


export default OrderUNCompleted;

