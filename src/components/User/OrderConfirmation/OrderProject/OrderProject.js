import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductPrice from '../ProductPrice/ProductPrice';
import './OrderProject.css';

class OrderProject extends Component {

    state = {
        projectPrice: 0, loading: true,
    }
    componentDidMount() {

    }

    calculateProjectPrice = (cost) => {
        let temp = this.state.projectPrice;
        temp = temp + cost;
        this.setState({projectPrice: temp});
    }

    render() {
        let cost = 0;
        let entry = this.props.project.map((list,j) => {
            cost = ( parseInt(list.price) * parseInt(list.num) ) + cost ;
            return (<ProductPrice keyword={list.keyword} num={list.num} price={list.price} />);
        });
        return (
            <div className="OrderProject">
                <h3>{this.props.project[0].project} </h3>
                <table className="table table-striped">
                    <thead>
                     <th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                    </thead>
                    <tbody>
                    {entry}
                    <tr>
                        <td></td>
                        <td></td>
                        <td><h3 className="cart-responsive-font">جمع کل :</h3></td>
                        <td><h3 className="cart-responsive-font">{cost} تومان</h3></td>
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

export default connect(mapStateToProps,null)(OrderProject);

