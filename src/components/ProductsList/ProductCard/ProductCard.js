import React, { Component } from 'react';
import './ProductCard.css';
import {connect} from "react-redux";
import logo from "../../../logo.svg";
import {Link} from "react-router-dom";
import URLs from "../../../URLs";
// import axios from 'axios';
// import Alert from 'react-s-alert';
// import URLs from '../../../URLs';
// import dataCode from '../../../dataCode';
// import ProductBuy from './ProductBuy/ProductBuy';
// import { ClipLoader } from 'react-spinners';
// import { connect } from 'react-redux';
// import Comment from '../../Comments/Comments';
// import Modal from 'react-responsive-modal';
// import styles from '../../showSearchProductResult/custom-styling.css';
// import * as actions from '../../../store/actions/index';
// import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import '../../../App.css';


class ProductCard extends Component {

    render(){

       


        return(
            <div id="carouselExampleControls" class="carousel slide container" data-ride="carousel" >
                <div className="carousel-inner">
                    <div className="carousel-item active" >
                        <div className="card-deck " style={{direction : 'rtl'}}>
                            
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer mb-2" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50 " style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                            {/* 2 */}
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                            {/* 3 */}
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                            {/* 4 */}
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                        </div>
                    </div>
                
                    <div className="carousel-item " >
                        <div className="card-deck " style={{direction : 'rtl'}}>
                            
                            <div className="card" >
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text"> below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                            {/* 2 */}
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                            {/* 3 */}
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>
                            {/* 4 */}
                            <div className="card" style={{height:'360px'}}>
                                <img className="card-img-top" style={{height:'150px'}} src={logo} alt="Card image cap"/>
                                <div className="card-body" style={{height:'150px'}}>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                                
                                </div>
                                <div className="card-footer" style={{height:'60px'}}>
                                        <Link to="products/" className="btn btn-primary w-50" style={{margin: "auto", display: "block"}}>مشاهده </Link>
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next " href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon bg-dark " aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}



export default ProductCard;

