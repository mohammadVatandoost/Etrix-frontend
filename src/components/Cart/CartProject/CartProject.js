import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import CartProductPrice from "../CartProductPrice/CartProductPrice";
class CartProject extends Component {

    state = {
        projectPrice: 0, loading: true, project: []
    }
    componentDidMount() {
        // this.setState({project: this.props.project});
    }

    calculateProjectPrice = (cost) => {
        console.log("calculateProjectPrice");
        console.log(cost);
        let temp = this.state.projectPrice;
        temp = temp + cost;
        this.setState({projectPrice: temp});
    }

    render() {
        let projectPrice = 0;
        console.log("cart project render");
        console.log(this.props.project);
        let entry = this.props.project.map((list,j) => {
            // console.log("list");console.log(list);
            projectPrice = projectPrice + (parseInt(list.price) * parseInt(list.num));
            return (<CartProductPrice  key={j} calculateProjectPrice={this.calculateProjectPrice} deleteFromCart={this.props.deleteFromCart}  price={list.price} keyword={list.keyword} num={list.num} project={list.project} />);
        });
        let projectName ;
        if(this.props.project.length > 0) {
            projectName = <h3>{this.props.project[0].project}</h3>;
        }
        return (
            <div>
                {projectName}
                <table className="table table-striped">
                    <thead>
                    <th>حذف از سبد خرید</th><th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                    </thead>
                    <tbody>
                    {entry}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><h3 className="cart-responsive-font">جمع کل :</h3></td>
                        <td><h3 className="cart-responsive-font">{projectPrice} تومان</h3></td>
                    </tr>
                    </tbody>
                </table>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addProductPrice: (productName, productPrice) => dispatch( actions.addProductPrice(productName, productPrice) )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CartProject);

