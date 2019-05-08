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
        if(this.state.defAddress.length>0) {
            defAddress = this.state.defAddress.map((address,i) => {
               return (
                   <div>
                       <p>
                           <input type="checkbox" id="checkbox"/>
                           <label htmlFor="checkbox" id="checkboxLabel">{address.name}</label>
                           <p id="tell"  onChange={this.onChange}>تلفن: {address.name}</p>
                           <p id="postCode" onChange={this.onChange}>کد پستی: {address.name}</p>
                       </p>
                       <p className="address" onChange={this.onChange}>{address.name}</p>
                   </div>
               );
            });
        }
        // let defAddress = this.state.defAddress.map((item) =>{
        //     return (
        //         <span value={item.name}>{item.name}</span>
        //     );
        // });
        //
        // let tell = this.state.tell.map((item) =>{
        //     return (
        //         <span value={item.name}>{item.name}</span>
        //     );
        // });
        //
        // let postCode = this.state.post.map((item) =>{
        //     return (
        //         <span value={item.name}>{item.name}</span>
        //     );
        // });
        //
        // let subject = this.state.subject.map((item) =>{
        //     return (
        //         <span value={item.name}>{item.name}</span>
        //     );
        // });
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