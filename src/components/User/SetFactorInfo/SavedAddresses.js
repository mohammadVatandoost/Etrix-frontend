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
        console.log("SetFactorInfo componentDidMount");
        // axios.post(URLs.base_URL+URLs.get_subject_name, {token: this.props.token})
        //     .then(response => {
        //         console.log("SetFactorInfo componentDidMount done");console.log(response);
        //         this.setState({subject: response.data.subject, loading: false});
        //     })
        //     .catch(err => {console.log("SetFactorInfo componentDidMount error"); console.log(err);
        //         this.setState({loading: true}); });
        // axios.post(URLs.base_URL+URLs.get_tell_name, {token: this.props.token})
        //     .then(response => {
        //         console.log("SetFactorInfo get tell name ");console.log(response);
        //         this.setState({tell: response.data, loading: false});
        //     })
        //     .catch(err => {
        //         console.log("SetFactorInfo get tell name error")
        //         console.log(err);this.setState({loading: false});
        //     });
        axios.post(URLs.base_URL+URLs.get_address_tag, {token: this.props.token})
            .then(response => {
                console.log("SetFactorInfo get address tag ");console.log(response);
                // this.setState({defAddress: response.data, loading: false});
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
        const { data } = this.state;
        let defAddress = this.state.defAddress.map((item) =>{
            return (
                <span value={item.name}>{item.name}</span>
            );
        });

        let tell = this.state.tell.map((item) =>{
            return (
                <span value={item.name}>{item.name}</span>
            );
        });

        let postCode = this.state.post.map((item) =>{
            return (
                <span value={item.name}>{item.name}</span>
            );
        });

        let subject = this.state.subject.map((item) =>{
            return (
                <span value={item.name}>{item.name}</span>
            );
        });
        return(

                    <div className="savedAddresses">

                        <h1>انتخاب آدرس</h1>

                        <div className="Address">
                            <form action="#">
                                <p>
                                    <input type="checkbox" id="checkbox"/>
                                    <label htmlFor="checkbox" value={data.subject} id="checkboxLabel">{subject}</label>
                                    <p id="tell" value={data.tell} onChange={this.onChange}>تلفن: {tell}</p>
                                    <p id="postCode"  value={data.post} onChange={this.onChange}>کد پستی: {postCode}</p>
                                </p>

                                <p className="address" value={data.defAddress} onChange={this.onChange}>{defAddress}
                                    {/*<br/> <span className="fullAddress" value={data.defAddress}>
                                    آدرس....................................................
                                    ........................................................</span>*/}

                                </p>

                            </form>


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