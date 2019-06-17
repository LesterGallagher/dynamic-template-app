import React, { Component } from 'react';
import ons from 'onsenui';
import { register } from 'timeago.js';
import nlLocale from 'timeago.js/lib/lang/nl';
import { HashRouter as Router } from 'react-router-dom';
import '../../lib/firebase';
import '../../style/index';
import './App.css';
import AuthStore from '../../stores/AuthStore';
import PublicChatStore from '../../stores/PublicChatStore';
import Loading from '../Loading/Loading';
import Routes from '../Routes/Routes';
import 'onsenui/css/onsenui.css';
import FirebaseContext from '../Firebase';
import firebase from '../../lib/firebase';
import nl from 'date-fns/locale/nl'
import moment from 'moment';
import AppPublicStore from '../../stores/AppPublicStore';
import Helmet from 'react-helmet';
import getStyle from '../../lib/dynamic-app-utils/css-components-loader'
import { parseQuery } from '../../lib/util';
import { isIPhoneX, platform } from '../../config';
moment.locale('nl');

if (ons.platform.isIPhoneX() || isIPhoneX === 'true') { // Utility function
  // Add empty attribute to the <html> element
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
}

if (platform) {
  ons.platform.select(platform);
}

register('nl', nlLocale);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: AuthStore.isAuthenticated,
      userHasAuthenticated: AuthStore.userHasAuthenticated,
      user: AuthStore.user,
      template: null,
      componentCSS: null
    };

    AuthStore.on('change', this.handleAnyStoreChange);
    PublicChatStore.on('change', this.handleAnyStoreChange);
    AppPublicStore.on('change', this.handleAppPublicStoreChange);
  }

  componentWillUnmount() {
    AuthStore.removeListener('change', this.handleAnyStoreChange);
    PublicChatStore.removeListener('change', this.handleAnyStoreChange);
    AppPublicStore.removeListener('change', this.handleAppPublicStoreChange);
  }

  handleAppPublicStoreChange = () => {
    if (AppPublicStore.loading === false
      && AppPublicStore.appPublic) {
      this.setState({
        componentCSS: getStyle(AppPublicStore.appPublic)
      })
    }
  }

  handleAnyStoreChange = () => {
    if (this.state.userHasAuthenticated !== AuthStore.userHasAuthenticated
      || this.state.isAuthenticated !== AuthStore.isAuthenticated) {

      this.setState({
        userHasAuthenticated: AuthStore.userHasAuthenticated,
        isAuthenticated: AuthStore.isAuthenticated
      });
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.state.userHasAuthenticated
    };

    return (
      <FirebaseContext.Provider value={firebase}>
        <div className="App">
          <Helmet>
            <style>{this.state.componentCSS}</style>
          </Helmet>
          {this.state.userHasAuthenticated ? <Router>
            <Routes template={this.state.template} childProps={childProps} />
          </Router> : <Loading />}
        </div>
      </FirebaseContext.Provider>
    );
  }
}

export default () => {
  return (
    <App />
  );
}
