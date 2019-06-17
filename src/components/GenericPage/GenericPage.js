import React, { Component } from 'react';
import styles from './GenericPage.module.css';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar, Row, Col, Card, List, ListItem, ListTitle, ListHeader } from 'react-onsenui';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

class GenericPage extends Component {
    constructor(props) {
        super();
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderToolbar = () => {
        const {
            appPage,
            appPage: {
                appKey,
                frontmatter: {
                    title
                },
                id,
                isHomePage,
                markdown,
                uid
            }
        } = this.props;
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                {title}
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        const {
            appPage,
            appPage: {
                appKey,
                frontmatter: {
                    title
                },
                id,
                isHomePage,
                markdown,
                uid
            }
        } = this.props;

        return (
            <Page className={styles.ForumPage} renderToolbar={this.renderToolbar}>
                <div style={{ padding: 10 }}>
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
            </Page>
        );
    }
}

GenericPage.propTypes = {
    appPage: propTypes.object.isRequired
}

export default withRouter(GenericPage);
