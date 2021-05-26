import React from 'react';
import PropTypes from 'prop-types';
import Note from '@mapbox/dr-ui/note';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        this.setState({ error });
    }

    render() {
        const { hasError, error } = this.state;
        const { errorNote, errorNoteTitle } = this.props;
        if (hasError) {
            return (
                <Note theme="error" title={errorNoteTitle}>
                    {errorNote}
                    <details>
                        <summary className="cursor-pointer">
                            Error details
                        </summary>
                        {error && error.message && (
                            <pre>
                                <code>{error.message}</code>
                            </pre>
                        )}
                    </details>
                </Note>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.defaultProps = {
    errorNoteTitle: 'Something went wrong',
    errorNote: (
        <p>An error has occurred. Please refresh the page to try again.</p>
    )
};

ErrorBoundary.propTypes = {
    /** Wrap ErrorBoundary around components to catch any errors triggered from within those nodes. */
    children: PropTypes.node.isRequired,
    /** Title of error note. */
    errorNoteTitle: PropTypes.string,
    /** Contents of error note. */
    errorNote: PropTypes.node
};
