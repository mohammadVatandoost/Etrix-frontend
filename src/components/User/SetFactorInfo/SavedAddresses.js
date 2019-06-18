import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from "../../CardWrapper/CardWrapper";
import URLs from "../../../URLs";
import axios from 'axios';
import InlineError from '../../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import './SetFactorInfo.css';



class SavedAddresses extends Component {
    state = {
        data: {
            defAddress: '', tell: '', post: '', subject: '',
        },
         storedData: false, loading: true, addNewAddress: false, defAddress: [],tell: [],post: [],subject: [],
    }

    constructor(props){
        super(props);
        this.addNewAddress = this.addNewAddress.bind(this);
    }

    componentDidMount() {
        console.log("**************token***********");
        console.log(this.props.token);
        console.log("SetFactorInfo componentDidMount");
        axios.post(URLs.base_URL+URLs.get_address_tag, {token: this.props.token})
            .then(response => {
                console.log("SetFactorInfo get address tag ");console.log(response);
                this.setState({defAddress: response.data, loading: false});
            })
            .catch(err => {
                console.log("SetFactorInfo get address tag error")
                console.log(err);this.setState({loading: false});
            });

    }
    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });


    addNewAddress(){
       this.props.showNewAddress();
    }

    render(){
        let defAddress;
        if(this.state.defAddress.length > 0) {
            defAddress = this.state.defAddress.map((address,i) => {
               return (
                   <div>
                       <p>
                           <input type="checkbox" id="checkbox"/>
                           <label htmlFor="checkbox" id="checkboxLabel">{address.name}</label>
                           <span id="tell"  onChange={this.onChange}>تلفن: {address.name}</span>
                           <span id="postCode" onChange={this.onChange}>کد پستی: {address.name}</span>
                       </p>
                       <p className="address" onChange={this.onChange}>{address.name}</p>
                   </div>
               );
            });
        }

        return(

                    <div className="savedAddresses">

                        <h1>انتخاب آدرس</h1>

                        <div className="Address">
                            {defAddress}
                        </div>

                        <button onClick={this.addNewAddress} className="addNewAddressBtn">+افزودن آدرس جدید</button>

                    </div>



        )
    }
}



const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,null)(SavedAddresses);