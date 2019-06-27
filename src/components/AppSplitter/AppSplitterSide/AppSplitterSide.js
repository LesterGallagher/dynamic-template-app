import React, { Component } from 'react';
import { Splitter, SplitterContent, SplitterSide, Page, List, Icon, ListHeader, ListItem, ListTitle } from 'react-onsenui';
import styles from './AppSplitterSide.module.css';
import AppSplitterBanner from '../AppSplitterBanner/AppSplitterBanner';
import headerBg from './edges.svg';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import AppPagesStore from '../../../stores/AppPagesStore';

class AppSplitterSide extends Component {
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

    openUrl = url => () => {
        this.props.history.push(url);
        this.props.onMenuClose();
    }

    renderRoutes = () => {
        if (this.state.appPagesLoading) return null;

        return this.state.appPages.map(page => {
            const path = AppPagesStore.createPageUrl(page);
            console.log(path);
            return (
                <ListItem modifier="nodivider" onClick={this.openUrl(path)} key={path}>
                    <div className="left"><Icon icon={page.frontmatter.icon} /></div>
                    <div className="center">{page.frontmatter.title}</div>
                </ListItem>
            );
        })
    }

    render() {
        return (
            <List className={styles.list}>
                {/* <ListItem className={styles.firstListItem} style={{
                    backgroundImage: `url('${headerBg}')`,
                    height: 200
                }}>
                    <AppSplitterBanner />
                </ListItem> */}
                {this.renderRoutes()}
            </List>
        );
    }
}

AppSplitterSide.propTypes = {
    onMenuClose: propTypes.func.isRequired
}

export default withRouter(AppSplitterSide);
