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
import SavedAddresses from "./SavedAddresses";

class SetFactorInfo extends Component {
    state = {
        data: {
            address: '', phone: '', codePost: ''
        },
        price: 0, number: '', province: [], chosenProvince: null, cities: [], chosenCity: null,
        errors: {}, storedData: false, loading: false, addNewAddress: false
    }

    componentDidMount() {
        console.log("SetFactorInfo componentDidMount");
        axios.post(URLs.base_URL+URLs.user_cart_submit, {token: this.props.token})
            .then(response => {
                console.log("SetFactorInfo componentDidMount done");console.log(response);
                this.setState({price: response.data.price, number: response.data.number});
            })
            .catch(err => {console.log("SetFactorInfo componentDidMount error"); console.log(err); });
        axios.get(URLs.base_URL+URLs.get_province_name)
            .then(response => {
                console.log("SetFactorInfo get province name ");console.log(response);
                this.setState({province: response.data});
            })
            .catch(err => {
                console.log("SetFactorInfo get province name error")
                console.log(err);
            });
    }
    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    //========================= ADD NEW ADDRESS =======================
    // newAddress = () => {
    //     console.log('newAddress function');
    //     this.setState( {addNewAddress: false});
    //
    // }

    selectChange = (event) => {
        console.log("SetFactorInfo select changes");
        console.log(event.target.value);
        let temp = event.target.value;
        if(temp !== 'لطفا استان خود را انتخاب کنید') {
            console.log(temp);
            this.setState({chosenProvince: temp});
            axios.get(URLs.base_URL+URLs.get_cities_name+'?province='+temp)
                .then(response => {
                    console.log("SetFactorInfo get cities name ");console.log(response);
                    this.setState({cities: response.data});
                })
                .catch(err => {
                    console.log("SetFactorInfo get province name error")
                    console.log(err);
                });
        }

    }

    selectChange2 = (event) => {
        console.log("SetFactorInfo select changes2");
        let temp = event.target.value;
        if(temp !== 'لطفا شهر خود را انتخاب کنید') {
            this.setState({chosenCity: temp});
        }
    }

    selectChange3 = (event) => {
        console.log("SetFactorInfo select changes2");
        let temp = event.target.value;
        if(temp !== 'لطفا شهر خود را انتخاب کنید') {
            this.setState({chosenCity: temp});
        }
    }

    sendData = () => {
        // token,phone,address,city,province,pos
        const errors = this.validate(this.state.data);
        // console.log(URLs.base_URL + URLs.user_set_order_address);
        // console.log(this.props.token);
        // console.log(this.state.data.phone);
        // console.log(this.state.data.codePost);
        // console.log(this.state.data.address);console.log(this.state.chosenCity);console.log(this.state.chosenProvince);
        // console.log("SetFactorInfo send Data");
        // console.log(errors);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            axios.post(URLs.base_URL + URLs.user_set_order_address, {
                token: this.props.token, phone: this.state.data.phone, post: this.state.data.codePost,
                address: this.state.data.address, city: this.state.chosenCity, province: this.state.chosenProvince,
            })
                .then(response => {
                    console.log("SetFactorInfo sendData done");
                    console.log(response);
                    this.setState({loading: false, storedData: true});
                })
                .catch(err => {
                    console.log("SetFactorInfo sendData error");
                    console.log(err);
                });
        }
    }

    preStep = () => {
        
        this.setState({loading: false, backedData: true});
        return <Redirect to="/basket" />;
    
    }

    showNewAddress = () => {
        this.setState({addNewAddress: true});
    }

    validate = (data) => {
        const errors = {};
        if (!data.phone) errors.phone = "شماره تلفن را وارد نکرده ابد";
        if (!data.address) errors.address = "آدرس را وارد نکرده ابد";
        if (!data.codePost) errors.codePost = "کد پستی را وارد نکرده ابد";
        if (this.state.chosenCity === 'لطفا استان خود را انتخاب کنید' || this.state.chosenCity === null) errors.chosenCity = "استان خود را انتخاب نکرده ایید";
        if (this.state.chosenProvince === 'لطفا استان خود را انتخاب کنید' || this.state.chosenProvince === null) errors.chosenProvince = "شهر خد را انتخاب نکرده ایید";
        // console.log(errors);
        return errors;
    }


    render() {
        let showNewAddressForum;

        console.log("SetFactorInfo render");
        const { data, errors } = this.state;
        let province = this.state.province.map((item) =>{
            return (
                <option value={item}>{item}</option>
            );
        });
        let cities = this.state.cities.map((item) =>{
          return (
            <option value={item.name}>{item.name}</option>
          );
        });


        if (this.state.storedData) {
            return <Redirect to="/User/OrderConfirnation" />;
        }

        else if(this.state.backedData) {
            
                return <Redirect to="/basket" />;
        }

        // if (this.setState({addNewAddress: false}))
        // {
        //     let newAddressSection = document.getElementsByClassName('from-control');
        //     let newAddressSection2 = document.getElementsByClassName('from-group');
        //     newAddressSection.show();
        //     newAddressSection2.show();
        // }
        if(this.state.addNewAddress) {
            showNewAddressForum = <CardWrapper>
                {/*<h2>شماره فاکتور : {this.state.number} </h2>*/}
                <input name="token" value={this.props.token} hidden />
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-sm-10 margin-2">
                        <select className="form-control" value={this.state.chosenProvince} onChange={this.selectChange}>
                            <option value={null}>لطفا استان خود را انتخاب کنید</option>
                            {province}
                        </select>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-10 margin-2">
                        <select className="form-control" value={this.state.chosenCity} onChange={this.selectChange2}>
                            <option value={null}>لطفا شهر خود را انتخاب کنید</option>
                            {cities}
                        </select>
                    </div>
                </div>
                {errors.chosenProvince && <InlineError text={errors.chosenProvince} />}
                <br/>
                {errors.chosenCity && <InlineError text={errors.chosenCity} />}
                <div className="form-group">
                    <label>آدرس جدید</label>
                    <input name="address" value={data.address} onChange={this.onChange} type="text" className="form-control"/>
                    {errors.address && <InlineError text={errors.address} />}
                </div>
                <div className="form-group">
                    <label> عنوان آدرس</label>
                    <input name="addressTitle" value={data.title} onChange={this.onChange} type="text" className="form-control"
                           placeholder="خانه، محل کار یا ..."/>

                </div>
                <div className="form-group">
                    <label>کد پستی</label>
                    <input name="codePost" value={data.codePost} onChange={this.onChange} type="text" className="form-control"/>
                    {errors.codePost && <InlineError text={errors.codePost} />}
                </div>
                <div className="form-group">
                    <label>شماره تلفن</label>
                    <input name="phone" value={data.phone} onChange={this.onChange} type="text" className="form-control"/>
                    {errors.phone && <InlineError text={errors.phone} />}
                </div>
            </CardWrapper>;
        }

        return (
            <div className="container setFactor-info" style={{direction: 'rtl'}}>
                {/*<SterProcess/>*/}
                <StepProcess number="2" />
                <h1 className="text-right">اطلاعات گیرنده</h1>
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <CardWrapper>
                            <SavedAddresses showNewAddress={this.showNewAddress} />
                        </CardWrapper>
                        <br/>

                        {showNewAddressForum}

                        <CardWrapper>
                            {/*<h2>شماره فاکتور : {this.state.number} </h2>*/}
                            <input name="token" value={this.props.token} hidden />
                            <div className="row">
                                <div className="col-lg-4 col-md-5 col-sm-10 margin-2">
                                    <select className="form-control" value={this.state.chosenProvince} onChange={this.selectChange}>
                                        <option value={null}>لطفا استان خود را انتخاب کنید</option>
                                        {province}
                                    </select>
                                </div>
                                <div className="col-lg-4 col-md-5 col-sm-10 margin-2">
                                    <select className="form-control" value={this.state.chosenCity} onChange={this.selectChange2}>
                                        <option value={null}>لطفا شهر خود را انتخاب کنید</option>
                                        {cities}
                                    </select>
                                </div>
                            </div>
                            {errors.chosenProvince && <InlineError text={errors.chosenProvince} />}
                            <br/>
                            {errors.chosenCity && <InlineError text={errors.chosenCity} />}
                            <div className="form-group">
                                <label>آدرس جدید</label>
                                <input name="address" value={data.address} onChange={this.onChange} type="text" className="form-control"/>
                                {errors.address && <InlineError text={errors.address} />}
                            </div>
                            <div className="form-group">
                                <label> عنوان آدرس</label>
                                <input name="addressTitle" value={data.title} onChange={this.onChange} type="text" className="form-control"
                                       placeholder="خانه، محل کار یا ..."/>

                            </div>
                            <div className="form-group">
                                <label>کد پستی</label>
                                <input name="codePost" value={data.codePost} onChange={this.onChange} type="text" className="form-control"/>
                                {errors.codePost && <InlineError text={errors.codePost} />}
                            </div>
                            <div className="form-group">
                                <label>شماره تلفن</label>
                                <input name="phone" value={data.phone} onChange={this.onChange} type="text" className="form-control"/>
                                {errors.phone && <InlineError text={errors.phone} />}
                            </div>
                        </CardWrapper>;
                    </div>
                    <div className="col-md-4 col-sm-12 text-center">
                        <CardWrapper>
                            <div className=" text-center">
                                <h2>جمع کل : {this.state.price} تومان</h2>
                                <h2>هزینه ارسال : 10 هزار تومان</h2>
                                <button  hidden={this.state.loading} onClick={this.sendData} className="btn btn-success">ادامه تکمیل سفارش</button>
                                <button  hidden={this.state.loading} onClick={this.preStep} className="btn btn-success">بازگشت به سبد خرید</button>

                                <ClipLoader loaderStyle={{size: '200'}} color={'#123abc'} loading={this.state.loading} />
                             </div>
                        </CardWrapper>
                    </div>
                </div>
                <br/><br/><br/><br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,null)(SetFactorInfo);

