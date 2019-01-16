import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderCompleted extends Component {
    state = {

    }

    componentDidMount() {
    }

    render() {


        return (
            <div className="container" style={{direction: 'rtl', padding: '4%'}}>
                <h2 className="text-center"> پرداخت شما با موفقیعت انجام شد</h2>
                <h2 className="text-center">سفارش شما با شماره {this.props.match.params.factorNumber} به زودی آماده می شود</h2>
                <br/>
                <h3 className="text-center">برای پیگیری سفارش خود به قسمت <Link to="/User/Follow-up">پیگیری سفارش ها</Link> مراجعه کنید.</h3>
            </div>
        )
    }
}


export default OrderCompleted;

