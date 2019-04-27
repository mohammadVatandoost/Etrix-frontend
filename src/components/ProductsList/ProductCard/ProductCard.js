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

        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };


        return(

                   <div className="ProductCardStyle ">
                       <img src={logo} className="App-logo" alt="logo" />
                       <h1>7805</h1>
                       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, nobis?</p>
                       <h2>800تومان</h2>
                       <Link to="products/" className="btn btn-primary2" style={{margin: "auto", display: "block"}}>مشاهده </Link>

                   </div>

        )
    }
}



export default ProductCard;

