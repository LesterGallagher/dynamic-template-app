import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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

const Introduction = asyncComponent(() => import('../Introduction/Introduction'));
const NoEntry = asyncComponent(() => import('../NoEntry/NoEntry'));
const NewRouteOrder = asyncComponent(() => import('../NewRouteOrder/NewRouteOrder'));
const Home = asyncComponent(() => import('../Home/Home'));
const RoutesOffersOverview = asyncComponent(() => import('../RoutesOffersOverview/RoutesOffersOverview'));
const RouteDetail = asyncComponent(() => import('../RouteDetail/RouteDetail'));
const PublicChat = asyncComponent(() => import('../PublicChat/PublicChat'));
const PersonalChat = asyncComponent(() => import('../PersonalChat/PersonalChat'));
const PersonalChatsOverview = asyncComponent(() => import('../PersonalChatsOverview/PersonalChatsOverview'));
const NotFound = asyncComponent(() => import('../NotFound/NotFound'));
const RouteOfferFlowDiagram = asyncComponent(() => import('../RouteOfferFlowDiagram/RouteOfferFlowDiagram'));
const AccountPage = asyncComponent(() => import('../AccountPage/AccountPage'));
const PersonalProfilePage = asyncComponent(() => import('../PersonalProfilePage/PersonalProfilePage'));
const ProfilePage = asyncComponent(() => import('../ProfilePage/ProfilePage'));
const FAQPage = asyncComponent(() => import('../FAQPage/FAQPage'));
const FAQQuestionPage = asyncComponent(() => import('../FAQPage/FAQQuestionPage/FAQQuestionPage'));
const ForumPage = asyncComponent(() => import('../ForumPage/ForumPage'));
const AboutPage = asyncComponent(() => import('../AboutPage/AboutPage'));
const SettingsPage = asyncComponent(() => import('../SettingsPage/SettingsPage'));

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
        console.log(AppPagesStore.appPages);
    }

    render() {
        const { childProps } = this.props;

        if (this.state.appPagesLoading) return <Loading />

        return (
            <Switch>
                {this.state.appPages.map(appPage => {
                    const path = AppPagesStore.createPageUrl(appPage);
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
        );
    }
}

export default Routes;
