import React, { Component } from 'react';
import { Route , Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';
import Main from './main';
import AuxWrapper from './components/AuxWrapper/AuxWrapper';
import HeaderCom from './components/HeaderCom/HeaderCom';
import FooterCom from './components/FooterCom/FooterCom';
import My404Component from './components/My404Component/My404Component';
import GoogleRegPass from './components/User/GoogleRegPass/GoogleRegPass';
import GoogleLogin from './components/User/GoogleLogin/GoogleLogin';
import Signup from './components/User/Signup/Signup';
import Cart from './components/Cart/Cart';
import showSearchProductResult from './components/showSearchProductResult/showSearchProductResult';
import Projects from './components/User/Projects/Projects';
import SetFactorInfo from './components/User/SetFactorInfo/SetFactorInfo';
import Conversions from './components/Conversions/Conversions';
import Project from './components/User/Projects/Project/Project';
import Followup from './components/User/Followup/Followup';
import Factor from './components/User/Factor/Factor';
import RequireAuth from './components/require_auth/require_auth';
import ContainerSmallSize from './components/Content/ContainerSmallSize/ContainerSmallSize';
import VideoContentContainer from './components/Content/VideoContentContainer/VideoContentContainer';
import ProductList from './components/ProductsList/ProductsList';
import Product from './components/ProductsList/Product/Product';
import OrderConfirnation from  './components/User/OrderConfirmation/OrderConfirnation';
import DynamicImport from './DynamicImport';
import Loading from './components/Loading/Loading';
// import './react-select.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class RouteAPI extends Component {

    AdminLogIn = (props) => (
        <DynamicImport load={() => import('./components/AdminControlPanel/AdminLogIn/AdminLogIn')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    ContentManagerLogin = (props) => (
        <DynamicImport load={() => import('./components/ContentManagerPanel/ContentManagerLogin/ContentManagerLogin')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    Login = (props) => (
        <DynamicImport load={() => import('./components/User/Login/Login')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    ContentDetail = (props) => (
        <DynamicImport load={() => import('./components/Content/ContentDetail/ContentDetail')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    Logout = (props) => (
        <DynamicImport load={() => import('./components/User/Logout/Logout')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    ContentManagerPanel = (props) => (
        <DynamicImport load={() => import('./components/ContentManagerPanel/ContentManagerPanel')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    AdminControlPanel = (props) => (
        <DynamicImport load={() => import('./components/AdminControlPanel/AdminControlPanel')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    OrderCompleted = (props) => (
        <DynamicImport load={() => import('./components/User/OrderCompleted/OrderCompleted')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    OrderUNCompleted = (props) => (
        <DynamicImport load={() => import('./components/User/OrderUNCompleted/OrderUNCompleted')}>
            {(Component) => Component === null
                ? <Loading/>
                : <Component {...props} />}
        </DynamicImport>
    )

    render() {

        return (
            <AuxWrapper>
                <HeaderCom/>
                <Alert stack={{limit: 3}} />
                <main className="flex-column responsive-margin">
                    <Switch>
                        <Route path="/User/buy/Uncompleted/:factorNumber" component={RequireAuth(this.OrderUNCompleted,null)}/>
                        <Route path="/User/buy/completed/:factorNumber" component={RequireAuth(this.OrderCompleted,null)}/>
                        <Route path="/User/SetFactorInfo" component={RequireAuth(SetFactorInfo,null)}/>
                        <Route path="/User/OrderConfirnation" component={RequireAuth(OrderConfirnation,null)}/>
                        <Route path="/User/Follow-up" component={RequireAuth(Followup,null)}/>
                        <Route path="/User/Factors/:orderNumber" component={RequireAuth(Factor,null)}/>
                        <Route path="/User/Projects/:projectName" component={RequireAuth(Project,null)}/>
                        <Route path="/User/Projects" component={RequireAuth(Projects,null)}/>
                        <Route path="/Logout" component={RequireAuth(this.Logout,null)}/>
                        <Route path="/googleLogin/:token" component={GoogleLogin}/>
                        <Route path="/google/:token" component={GoogleRegPass}/>
                        <Route path="/Product/:name" component={Product}/>
                        <Route path="/لیست-محصولات" component={ProductList}/>
                        <Route path="/search/:category/:keyword/:filter" component={showSearchProductResult}/>
                        <Route path="/search/:category/:keyword" component={showSearchProductResult}/>
                        <Route path="/سبد-خرید" component={Cart}/>
                        <Route path="/online-conversion-calculator" component={Conversions}/>
                        <Route path="/Signup/:message" component={Signup}/>
                        <Route path="/ثبت-نام" component={Signup}/>
                        <Route path="/ورود" component={this.Login}/>
                        <Route path="/مجله/:id/:title" component={this.ContentDetail}/>
                        <Route path="/ویدیوها" component={VideoContentContainer}/>
                        <Route path="/مجله" component={ContainerSmallSize}/>
                        <Route path="/ContentManagerPanel" component={RequireAuth(this.ContentManagerPanel,'cm')}/>
                        <Route path="/AdminLogIn" component={this.AdminLogIn}/>
                        <Route path="/AdminControlPanel" component={RequireAuth(this.AdminControlPanel,'admin')}/>
                        <Route path="/ContentManagerLogin" component={this.ContentManagerLogin}/>
                        <Route exact path="/" component={Main}/>
                        <Route component={My404Component} />
                    </Switch>
                </main>
                <FooterCom/>
            </AuxWrapper>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole
    };
};

export default withRouter(connect(mapStateToProps, null)(RouteAPI));

