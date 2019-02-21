import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from "../../CardWrapper/CardWrapper";
import URLs from "../../../URLs";
import axios from 'axios';
import OrderProject from './OrderProject/OrderProject';
import './OrderConfirnation.css';
import { isObject } from '../../../store/utility';

class OrderConfirnation extends Component {
    state = {
        address: '', phone: '', codePost: '', city: '', province: '',
        postPrice: 0,  projects: [],
        errors: {}, factorNumber: '', priceAllProjects: '',
    }

    componentDidMount() {
        console.log("OrderConfirnation componentDidMount");
        console.log(this.props.token);
        axios.post(URLs.base_URL+URLs.user_get_pre_factor, {token: this.props.token})
            .then(response => {
                console.log("OrderConfirnation response");console.log(response);
                let cart = response.data.cart;
                if(isObject(cart)) {
                    let tempCart = [];
                    Object.keys(cart).map((property) => {
                        tempCart.push(cart[property])   ;
                    });
                    cart = tempCart;
                }
                if (cart.length > 0) {
                    this.setState({
                        address: response.data.address,
                        projects: cart,
                        city: response.data.city,
                        factorNumber: response.data.number,
                        province: response.data.province,
                        priceAllProjects: response.data.price,
                        postPrice: response.data.delivery
                    });
                }
            })
            .catch(err => {
                console.log("OrderConfirnation error");
                console.log(err);
            });
    }
    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    confirmFactor = () => {

    }


    render() {
        console.log("OrderConfirnation render");
        let orderList = this.state.projects.map( (project, i) => {
            return (
                <OrderProject  key={i} project={project} />
            );
        });

        return (
            <div className="container order-confirmation" style={{direction: 'rtl'}}>
                <br/>
                <h1 className="text-right">پرداخت</h1>
               <div className="row">
                   <div className="col-md-8 col-sm-12">
                       <CardWrapper>
                       {orderList}
                       </CardWrapper>
                   </div>
                   <div className="col-md-4 col-sm-12">
                       <CardWrapper>
                        <h2 className="text-center">هزینه کل قطعات : {this.state.priceAllProjects} تومان</h2>
                        <h2 className="text-center">هزینه ارسال سفارش : {this.state.postPrice} تومان</h2>
                        {/*<br/>*/}
                        <h2 className="text-center">مبلغ پرداختی سفارش : {parseInt(this.state.postPrice) + parseInt(this.state.priceAllProjects)} تومان</h2>
                        {/*<br/>*/}
                        <form action={URLs.base_URL+URLs.user_cart_confirm} method="post">
                           <input name="token" hidden value={this.props.token} />
                           <button type="submit" className="btn btn-success" style={{display: 'block', margin: 'auto'}}>پرداخت</button>
                        </form>
                       </CardWrapper>
                   </div>
               </div>
                {/*<CardWrapper>*/}
                    {/*/!*<h1 className="text-center">پیش فاکتور</h1>*!/*/}
                    {/*<br/>*/}
                    {/*<h3 className="text-right"> شماره فاکتور: {this.state.factorNumber}</h3>*/}
                    {/*<br/>*/}
                   {/**/}
                {/*</CardWrapper>*/}
                {/*<br/><br/>*/}
                <br/><br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,null)(OrderConfirnation);

