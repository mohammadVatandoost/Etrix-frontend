import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../store/actions/index';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import URLs from '../../URLs';
import './Cart.css';
import CartProject from './CartProject/CartProject';
import Modal from 'react-responsive-modal';
import styles from './custom-styling.css';
import AuxWrapper from "../AuxWrapper/AuxWrapper";
import CardWrapper from '../CardWrapper/CardWrapper';
import StepProcess from '../StepProcess/StepProcess';

class Cart extends Component {

    state  = {
        prices: {}, loading: true, priceRequestSend: false, projects: [], open: false, projectName: null,
        sumCart: 0, cart: []
    }

    componentDidMount() {
        // console.log("Cart componentDidMount");console.log(this.props.token);
       if(this.props.token) {
           this.props.getCartFromServer(this.props.token);
           this.getProjects();
       } else {
           if(this.props.cart.length === 0) {
               console.log("this.props.checkCartStore()");
               this.props.checkCartStore();
           }
       }
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

    getProjectCost = (i) => {
        console.log(' projectsPrice  ');console.log(i);
        console.log(this.props.projectsPrice);
        console.log(' getProjectCost productPrices ');console.log(this.props.productPrices);
        if(this.props.projectsPrice.length > 0) {
            return this.props.projectsPrice[0].cost;
        }
    }

    renderCartTable = () => {
        console.log('renderCartTable');console.log(this.props.cart);
        let cartLsit = this.props.cart.map((project, i) => {
            // let entry = project.map((list,j) => {
            //     price = price + (parseInt(list.price) * parseInt(list.num));
            // });
            return (
               <CartProject  key={i} project={project} deleteFromCart={this.deleteFromCart} />
            );
        });

      return cartLsit;
    }

    onOpenModal = () => {
            this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getProjects = () => {
        axios.post(URLs.base_URL+URLs.user_get_projects, {token: this.props.token})
            .then(response => {
                console.log("projects");console.log(response);
                this.setState({projects: response.data});
            })
            .catch(err => {
                console.log("get projects error");
                console.log(err);
            });
    }

    selectChange = (event) => {
        this.setState({projectName: event.target.value});
    }

    render() {
        let cartList;let buyButton = null;let sum = null;let price = 0;
        let cartCard;
        let steps;
          // console.log("this.props.randomKey");console.log(this.props.randomKey);
          if(!this.props.cartLoading) {
            if(this.props.cartLength > 0){  //} else
                steps = <StepProcess number="1"/>;
               cartList = this.renderCartTable();
                 this.props.cart.map((project, i) => {
                    project.map((list,j) => {
                        price = price + (parseInt(list.price) * parseInt(list.num));
                    });
                 });
                sum = <AuxWrapper><h2>جمع کل : {price} تومان</h2><h2>هزینه ارسال : وابسته به آدرس شماست</h2></AuxWrapper>;
               if(this.props.token) {
                   buyButton = <Link to="/User/SetFactorInfo" className="btn btn-success">ادامه تکمیل سفارش</Link>;
               } else {
                   buyButton = <Link to="/Signup/cart" className="btn btn-success">ادامه تکمیل سفارش</Link>;
               }
                cartCard =<AuxWrapper>
                    <h1 className="text-right">سبد خرید</h1>
                  <div className="row cart-card">
                    <div className="col-md-8 col-sm-12">
                        <CardWrapper>{cartList}</CardWrapper>
                    </div>
                    <div className="col-md-4 col-sm-12 text-center">
                        <CardWrapper><div className="text-center">{sum}{buyButton}</div></CardWrapper>
                    </div>
                  </div>
                </AuxWrapper>
           } else {
                cartCard = <h1 className="text-center margin-bottom-4 margin-top-4">سبد خرید شما خالی هست</h1>;
                // steps = <h1 className="text-center margin-bottom-4 margin-top-4">سبد خرید شما خالی هست</h1>;

            }
          }
           let projectsOption;
        if(this.state.projects.length > 0) {
            projectsOption = this.state.projects.map((project, i) => {
                return (<option value={project.name} key={project.name}>{project.name}</option>)
            });
        }
        return(
            <div className="container table-responsive text-center cart-card-Container">
                {steps}
                {/*{steps}*/}
                {cartCard}
                <br/><br/>
                <ClipLoader size="200" color={'#123abc'} loading={this.props.cartLoading} />
                <Modal open={this.state.open} onClose={this.onCloseModal} center
                       classNames={{overlay: styles.customOverlay, modal: styles.customModal,}}>
                    <div className="select-project">
                        <h3 className="text-center">انتخاب پروژه</h3>
                        <form method="post" action={URLs.base_URL+URLs.cm_add_image}  encType="multipart/form-data">
                            <input hidden type="text" name="token" value={this.props.token} />
                            <br/>
                            <div className="col-lg-4 col-md-6 col-sm-10 horizontal-center">
                                <select className="form-control" value={this.state.projectName} onChange={this.selectChange}>
                                    <option value={null}>-</option>
                                    {projectsOption}
                                </select>
                            </div>
                            <br/>
                            <div className="form-group text-right" style={{direction: "rtl"}}>
                                <label>فایل اکسل BOM </label>
                                <input name="imageFile" onChange={this.onChangeFile} type="file" className="form-control-file"/>
                                {/*{errors.imageFile && <InlineError text={errors.imageFile} />}*/}
                            </div>
                            <br/>
                            <button onClick={()=> this.addToCart(this.state.productName, this.state.category, this.state.number)} className="btn btn-success horizontal-center">اضافه به سبد خرید</button>
                            <br/>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (productName,number,category) => dispatch(actions.addToCart(productName,number,category)),
        checkCartStore: () => dispatch(actions.getCartFromLocalStorage()),
        getCartFromServer: (token) => dispatch(actions.getCartFromServer(token)),
        restoreCart: (response) => dispatch(actions.restoreCart(response)),
        removeFromCart: (productName,projectName) => dispatch(actions.removeFromCart(productName,projectName)),
        updateCartPrices: (productPrices) => dispatch(actions.updateCartPrices(productPrices)),
    };
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        cartLength: state.cart.cartLength,
        cartLoading: state.cart.loading,
        token: state.auth.token,
        projectsPrice: state.cart.projectsPrice,
        productPrices: state.cart.productPrices,
        cartSumCost: state.cart.cartSumCost,
        randomKey: state.cart.randomKey
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Cart));