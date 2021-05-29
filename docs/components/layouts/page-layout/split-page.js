import React from 'react';
import PropTypes from 'prop-types';

export default class SplitPage extends React.PureComponent {
    render() {
        const { children } = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}

SplitPage.propTypes = {
    children: PropTypes.node
};
