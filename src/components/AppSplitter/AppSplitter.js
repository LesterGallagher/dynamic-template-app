import React, { Component } from 'react';
import styles from './AppSplitter.module.css';
import { Splitter, SplitterContent, SplitterSide, Page, List, Icon, ListHeader, ListItem, ListTitle } from 'react-onsenui';
import { withRouter } from 'react-router-dom';
import AppSplitterSide from './AppSplitterSide/AppSplitterSide';

class AppSplitter extends Component {
    constructor(props) {
        super();
        this.state = {
            isOpen: false
        };
    }

    componentWillMount() {
        console.log('OPEENNNNN')
        window.toggleOnsMenu = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    componentWillUnmount() {
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    openUrl = url => () => {
        this.props.history.push(url);
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <Splitter>
                <SplitterSide
                    side="left"
                    width={350}
                    collapse={true}
                    animation="default"
                    isOpen={this.state.isOpen}
                    onClose={this.handleClose}>
                    <Page>
                        <AppSplitterSide onMenuClose={this.handleClose} />
                    </Page>
                </SplitterSide>
                <SplitterContent>
                    {this.props.children}
                </SplitterContent>
            </Splitter>
        );
    }
}

export default withRouter(AppSplitter);

// export default windowDimensions({
//     take: () => ({ windowWidth: window.innerWidth, windowHeight: window.innerHeight }),
//     debounce: onResize => debounce(onResize, 100),
// })(withRouter(AppSplitter));
