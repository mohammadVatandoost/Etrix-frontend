import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import InputAddMinus from "../../InputAddMinus/InputAddMinus";
import Alert from 'react-s-alert';
import URLs from "../../../URLs";

class CartProductPrice extends Component {

    state = {
        price: 0, loading: true, number: 1, keyword: ''
    }
    componentDidMount() {
        // axios.post(URLs.base_URL+URLs.product_get_price, {keyword: this.props.keyword})
        //     .then(response => {
        //         console.log("CartProductPrice price");
        //         console.log(response);
        //         this.setState({price: response.data.unit_price, loading: false});
        //         this.props.addProductPrice(this.props.keyword, response.data.unit_price);
        //         console.log(this.props.num);
        //         console.log(response.data.unit_pric);
        //         this.props.calculateProjectPrice(parseInt(this.props.price) * parseInt(this.props.num));
        //     })
        //     .catch(err => {
        //         console.log("CartProductPrice price error");
        //         console.log(err);
        //     });
        this.setState({price: this.props.price, number: this.props.num, keyword: this.props.keyword});
    }

    deleteFromCart = (productName,projectName) => {
        if(this.props.token) {
            console.log("removeFromCart with token");
            axios.post(URLs.base_URL + URLs.user_cart_remove, {
                token: this.props.token,
                keyword: productName,
                project: projectName
            })
                .then(response => {
                    console.log("deleteFromCart function");
                    console.log(response);
                    this.props.restoreCart(response);
                    Alert.success("از سبد خرید حذف شد", {
                        position: 'bottom-right',
                        effect: 'scale',
                        beep: false,
                        timeout: 4000,
                        offset: 100
                    });
                })
                .catch(err => {
                    console.log("deleteFromCart");
                    console.log(err);
                    Alert.error('اختلالی پیش آمدعه است،دوباره امتحن کنید', {
                        position: 'bottom-right',
                        effect: 'scale',
                        beep: false,
                        timeout: 4000,
                        offset: 100
                    });
                });
        } else {
            console.log("removeFromCart reducer without token");
            this.props.removeFromCart(productName,projectName)
        }
    }

    add = () => {
       this.props.changeUserProductNumCart(this.props.keyword, this.props.num+1, this.props.project);
        console.log("cart add num");console.log(this.props.cart);
        console.log("counterForChangeTrig");console.log(this.props.counterForChangeTrig);
    }

    minus = () => {
        if(this.props.num-1 > 0) {
            this.props.changeUserProductNumCart(this.props.keyword, this.props.num - 1, this.props.project);
        } else {
           this.deleteFromCart(this.props.keyword, this.props.project);
        }
    }

    onChange =  (e) => {
        console.log("onChange");
        // console.log(e.target.value);
        this.props.changeUserProductNumCart(this.props.keyword, e.target.value, this.props.project);
    }

    render() {
        // if(this.props.num > 1) {
        //     console.log(this.props.keyword+"number change");
        // }
        return (
            <tr>
                <td>
                    <button onClick={() => this.props.deleteFromCart(this.props.keyword, this.props.project)}><i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
                <td>{this.props.keyword}</td>
                <td>
                    {this.props.num}
                    {/*<InputAddMinus onChange={this.onChange} min={1} placeholder="" value={this.state.number} add={this.add} minus={this.minus} />*/}
                </td>
                <td>
                    <span>{this.props.price}</span>
                    {/*<ClipLoader size="50" color={'#123abc'} loading={this.state.loading}/>*/}
                </td>
                <td><span> {parseInt(this.props.price) * parseInt(this.props.num)}</span></td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole,
        cartLength: state.cart.cartLength,
        token: state.auth.token,
        cart: state.cart.cart,
        counterForChangeTrig: state.cart.counterForChangeTrig
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        changeUserProductNumCart: (productName, number, projectName) => dispatch(actions.changeNumProductCart(productName, number, projectName)),
        addProductPrice: (productName, productPrice) => dispatch( actions.addProductPrice(productName, productPrice) )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CartProductPrice);

