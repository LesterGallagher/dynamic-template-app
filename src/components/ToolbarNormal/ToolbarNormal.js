import React, { Component } from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon } from 'react-onsenui';

class ToolbarNormal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleMenuClick = () => {
        window.toggleOnsMenu();
    }

    render = () => {
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">{this.props.name}</div>
        </Toolbar>);
    }
}

export default ToolbarNormal;
