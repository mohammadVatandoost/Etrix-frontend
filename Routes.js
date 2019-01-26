// Routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'
import NoMatch from './NoMatch'

const RenderMergedProps = (component, ...rest) => {
    const mergedProps = Object.assign({}, ...rest)
    return (
        React.createElement(component, mergedProps)
    )
}

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return RenderMergedProps(component, routeProps, rest)
        }} />
    )
}

const Routes = props => {
    return (
        <Switch location={props.location}>
            <PropsRoute
                path="/privacy-policy"
                exact
                component={PrivacyPolicy}
                {...props}
            />
            <PropsRoute
                path="/notfound"
                exact
                component={NoMatch}
                {...props}
            />
            <PropsRoute
                component={NoMatch}
                {...props}
            />
        </Switch>
    )
}