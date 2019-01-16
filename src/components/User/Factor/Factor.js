import React , { Component } from 'react';
import URLs from "../../../URLs";
import axios from 'axios';
import AuxWrapper from '../../AuxWrapper/AuxWrapper';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

class Factor extends Component {

    state = {
        factors: [], loading: true, Date: '', Time: '', orderNumber: '', totalPrice: '',
    }

    componentDidMount() {
        axios.post(URLs.base_URL+URLs.user_get_bill, {token: this.props.token, order_number: this.props.match.params.orderNumber})
            .then(response => {
                console.log("componentDidMount Factor response");console.log(response);
                this.setState({factors: response.data.cart, loading: false, Date: response.data.date.split(" ")[0],
                    Time: response.data.date.split(" ")[1], orderNumber: response.data.order_number, totalPrice: response.data.totalPrice
                });
                // this.setState({factors: response.data, loading: false});
            })
            .catch(err => {
                console.log("componentDidMount Factor err");
                console.log(err);this.setState({loading: false});
            });
    }

    getFactors = () => {

    }

    render() {
        // console.log("Project");console.log("render");
        let projects;
        if(!this.state.loading) {
            if (this.state.factors.length > 0) {
                console.log("render factor");console.log(this.state.factors);
                let factors = this.state.factors.map((factor) => {
                    let sum = 0;
                    let project = factor.map((order)=>{
                        sum = sum + (parseInt(order.num) * parseInt(order.price));
                        return (
                            <tr>
                                <td>{order.keyword}</td>
                                <td>{order.num}</td>
                                <td>{order.price} تومان</td>
                                <td>{parseInt(order.num) * parseInt(order.price)}</td>
                            </tr>
                        );
                    });
                   return (
                    <AuxWrapper>
                     <br/><hr/><br/>
                     <h3 className="text-center">{factor[0].project}</h3>
                     <table className="table table-striped">
                        <thead>
                        <th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                        </thead>
                        <tbody>
                        {project}
                        <tr>
                            <td></td>
                            <td></td>
                            <td><h3 className="cart-responsive-font">جمع کل :</h3></td>
                            <td><h3 className="cart-responsive-font">{sum} تومان</h3></td>
                        </tr>
                        </tbody>
                    </table>
                   </AuxWrapper>
                   );
                });
                projects = <div hidden={this.state.loading} className="container responsive-margin" style={{direction: "rtl"}}>
                    <div className="flex-row space-around margin-2">
                        <h2 className="text-right">فاکتور شماره {this.state.orderNumber}</h2>
                        <span className="text-left">ساعت: {this.state.Time} </span><span className="text-left">تاریخ : {this.state.Date} </span>
                    </div>
                    {factors}
                </div>
            } else {
                projects = <AuxWrapper>
                        <h2 className="text-center">فاکتوری با کد  {this.props.match.params.orderNumber} پیدا نشد</h2>
                        <p className="text-center">در صورت داشتن هر گونه سوال با ایمیل contact@etrix.ir تماس بگیرید</p>
                </AuxWrapper>
            }
        }
        return (
            <AuxWrapper>
             <div className="text-center margin-2">
               <ClipLoader size={250} sizeUnit={"px"} color={'#123abc'} loading={this.state.loading} />
             </div>
              {projects}
            </AuxWrapper>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Factor);


