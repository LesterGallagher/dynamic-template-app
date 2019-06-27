import React, { Component } from 'react';
import { Switch, Route, withRouter, match } from 'react-router-dom';
import './Routes.css';

import AppSplitter from '../AppSplitter/AppSplitter';
import Loader from '../Loader/Loader';
import AppliedRoute from "../AppliedRoute/AppliedRoute";
import UnauthenticatedRoute from '../UnauthenticatedRoute/UnauthenticatedRoute';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import asyncComponent from '../AsyncComponent/AsyncComponent';
import * as ROUTES from '../../constants/routes';
import PublicChatSubjectOverview from '../PublicChatSubjectOverview/PublicChatSubjectOverview';
import FindCourierPage from '../FindCourierPage/FindCourierPage';
import MyDeliveriesPage from '../MyDeliveriesPage/MyDeliveriesPage';
import MyRouteOrdersPage from '../MyRouteOrdersPage/MyRouteOrdersPage';

// import Introduction from '../Introduction/Introduction';
// import NoEntry from '../NoEntry/NoEntry';
// import NewRouteOrder from '../NewRouteOrder/NewRouteOrder';
// import Home from '../Home/Home';
// import RoutesOffersOverview from '../RoutesOffersOverview/RoutesOffersOverview';
// import RouteDetail from '../RouteDetail/RouteDetail';
// import PublicChat from '../PublicChat/PublicChat';
// import PersonalChat from '../PersonalChat/PersonalChat';
// import PersonalChatsOverview from '../PersonalChatsOverview/PersonalChatsOverview';
// import NotFound from '../NotFound/NotFound';
// import RouteOfferFlowDiagram from '../RouteOfferFlowDiagram/RouteOfferFlowDiagram';

import { ReduxNavigator } from 'onsenui-react-redux-navigator'
import AppPagesStore from '../../stores/AppPagesStore';
import Loading from '../Loading/Loading';
import GenericPage from '../GenericPage/GenericPage';

const NotFound = asyncComponent(() => import('../NotFound/NotFound'));

class Routes extends Component {
    constructor(props) {
        super();
        this.state = {
            appPagesLoading: AppPagesStore.loading,
            appPages: AppPagesStore.appPages
        };

    }

    componentWillMount() {
        AppPagesStore.on('change', this.handlePagesChange);
    }

    componentWillUnmount() {
    }

    handlePagesChange = () => {
        this.setState({
            appPagesLoading: AppPagesStore.loading,
            appPages: AppPagesStore.appPages
        });
        console.log('APP_PAGES_CHANGE', AppPagesStore.appPages, 'LOADING', AppPagesStore.loading);
    }

    render() {
        const { childProps } = this.props;

        if (this.state.appPagesLoading) return <Loading />

        return (
            <div>
                <Switch>
                    {this.state.appPages.map(appPage => {
                        const path = AppPagesStore.createPageUrl(appPage);
                        console.log('ROUTES PATH', path, this.props.location.pathname, appPage);
                        return (
                            <AppliedRoute exact
                                childProps={childProps}
                                key={path}
                                path={path}
                                component={
                                    () => <AppSplitter><GenericPage appPage={appPage} /></AppSplitter>
                                } />
                        );
                    })}
                    <AppliedRoute component={NotFound} />
                </Switch>
            </div>

        );
    }
}

export default withRouter(Routes);
