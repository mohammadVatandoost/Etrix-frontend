import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from "../../CardWrapper/CardWrapper";
import URLs from "../../../URLs";
import axios from 'axios';
import InlineError from '../../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import './SetFactorInfo.css';
import StepProcess from '../../StepProcess/StepProcess'



class SavedAddresses extends Component {
    constructor(props){
        super(props);
        this.addNewAddress = this.addNewAddress.bind(this);

    }

    addNewAddress(){
       this.props.showNewAddress();
    }

    render(){
        let newAddress;
        // if() {
        //     newAddress =
        // }
        return(

                    <div className="savedAddresses">

                        <h1>انتخاب آدرس</h1>

                        <div>
                            <form action="#">
                                <p>
                                    <input type="checkbox" id="checkbox"/>
                                    <label htmlFor="checkbox" id="checkboxLabel">خانه</label>
                                </p>
                            </form>
                            <p className="address">آدرس.................................................</p>

                        </div>

                        <button onClick={this.addNewAddress} className="addNewAddressBtn">+افزودن آدرس جدید</button>

                    </div>



        )
    }
}




export default SavedAddresses;