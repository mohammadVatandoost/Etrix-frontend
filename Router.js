import React from 'react';
import { Route } from 'react-router';
// import sitemap from 'react-router-sitemap
export default (
    <Route>
        <Route path="/User/buy/Uncompleted/:factorNumber"/>
        <Route path="/User/buy/completed/:factorNumber" />
        <Route path="/User/SetFactorInfo"/>
        <Route path="/User/OrderConfirnation"/>
        <Route path="/User/Follow-up"/>
        <Route path="/User/Factors/:orderNumber"/>
        <Route path="/User/Projects/:projectName"/>
        <Route path="/User/Projects"/>
        <Route path="/Logout" />
        <Route path="/googleLogin/:token"/>
        <Route path="/google/:token"/>
        <Route path="/Product/:name"/>
        <Route path="/لیست-محصولات"/>
        <Route path="/search/:category/:keyword/:filter"/>
        <Route path="/search/:category/:keyword"/>
        <Route path="/سبد-خرید"/>
        <Route path="/online-conversion-calculator"/>
        <Route path="/Signup/:message"/>
        <Route path="/ثبت-نام"/>
        <Route path="/ورود"/>
        <Route path="/مجله/:id/:title"/>
        <Route path="/ویدیوها"/>
        <Route path="/مجله" />
        <Route path="/ContentManagerPanel"/>
        <Route path="/AdminLogIn"/>
        <Route path="/AdminControlPanel"/>
        <Route path="/ContentManagerLogin"/>
        <Route exact path="/" />
    </Route>
);