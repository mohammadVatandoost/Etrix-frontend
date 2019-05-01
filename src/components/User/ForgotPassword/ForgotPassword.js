import React , {Component} from 'react';
import GoogleSingup from  '../GoogleSignup/GoogleSignup';
import { Redirect, Link } from 'react-router-dom';
import Validator from 'validator';
import InlineError from '../../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import CardWrapper from '../../CardWrapper/CardWrapper';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import './ForgotPassword.css';
import URLs from "../../../URLs";
import Alert from 'react-s-alert';

class ForgotPassword extends Component {

    state = {
        data: {
            email: '',
            password: '',
            name: ''
        },
        // loading: false,
        errors: {}
    }

    componentDidMount() {
        // this.props.checkAuthState();
        if(this.props.match.params.message != null) {
            Alert.info('برای ادامه خرید باید در سایت ثبت نام کنید', {
                position: 'bottom-right',
                effect: 'scale',
                beep: false,
                timeout: 5000,
                offset: 100
            });
        }
    }

    sendData = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            // this.setState({loading: true});
            console.log('sendData');
            let data = this.state.data;
            this.props.registerUser(data.email, data.tell, URLs.base_URL + URLs.user_forgotPassword);
            //     axios.post(URLs.base_URL+URLs.user_register,{email: this.state.data.email , password: this.state.data.password, name: this.state.data.name})
            //         .then((res) => {
            //             console.log(res);
            //             // Alert.info('برای ادامه خرید باید در سایت ثبت نام کنید', {
            //             //     position: 'bottom-right',
            //             //     effect: 'scale',
            //             //     beep: false,
            //             //     timeout: 5000,
            //             //     offset: 100
            //             // });
            //             // this.setState({loading: false});
            //         })
            //         .catch((error)=> {
            //             // this.setState({loading: false});
            //             console.log("Error");
            //             console.log(error);
            //         });
            // }
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "ایمیل نامعتبر است";
        if (!data.tell) errors.tell = "تلفن همراه را وارد نکرده اید";
        return errors;
    }

    // onChange = e =>
    //     this.setState({
    //         data: { ...this.state.data, [e.target.name]: e.target.value }
    //     });


    showErrorMessage = () => {
        Alert.error(this.props.errosMessage, {
            position: 'bottom-right',
            effect: 'scale',
            beep: false,
            timeout: 5000,
            offset: 100
        });
        this.props.emptyErrorMessage(null);
    }

    render() {
        // if (this.props.token) {
        //     return <Redirect to="/" />;
        // }
        if(this.props.errosMessage) {this.showErrorMessage();}
        const { data, errors } = this.state;
        const loading = this.props.loading;
        return (
            <div className="container signupWidth">
                <CardWrapper>
                    <h1>بازیابی رمز عبور</h1>
                    <hr/>
                    <br/>
                    <form onSubmit={this.sendData}>

                        <div className="form-group text-right">
                            <label htmlFor="exampleInputEmail1">ایمیل</label>
                            <input name="email" value={data.email} onChange={this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                   placeholder="ایمیل خود را وارد کنید"/>
                            {errors.email && <InlineError text={errors.email} />}
                        </div>
                        <div className="form-group text-right">
                            <label htmlFor="exampleInputPassword1">تلفن همراه</label>
                            <input name="tell" value={data.tell} onChange={this.onChange} type="tell" className="form-control" id="exampleInputPassword1" placeholder="Ex: +989123456789"/>
                            {errors.tell && <InlineError text={errors.tell} />}
                        </div>
                        <div className="flex-row space-between">
                            <div>
                                <button hidden={loading} onClick={this.sendData} type="submit" className="btn btn-success">بازیابی رمز عبور</button>
                                <input type="submit" style={{display: 'none'}} />
                                <ClipLoader color={'#123abc'} loading={loading} />
                            </div>
                            <Link to="/register">ثبت نام نکرده ام</Link>
                        </div>
                    </form>
                    <br/>
                    <br/>
                </CardWrapper>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        errosMessage: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        registerUser: (email, tell, url) => dispatch( actions.registerUser(email, tell, url) ),
        emptyErrorMessage: (error) => dispatch( actions.authFail(error) )
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);