import React from 'react';
import PropTypes from 'prop-types';
import ExampleIndex from './example-index.js';
import classnames from 'classnames';
import OnThisPage from '@mapbox/dr-ui/on-this-page';
import OverviewHeader from '@mapbox/dr-ui/overview-header';

export default class Content extends React.PureComponent {
    render() {
        const {
            children,
            layoutConfig,
            filters,
            parentPath,
            frontMatter,
            AppropriateImage
        } = this.props;
        const { showCards } = layoutConfig;
        // if showCards is true, use the ExampleIndex component
        // else use the default content wrapper to display the content
        return showCards ? (
            <ExampleIndex
                {...this.props}
                filters={filters[parentPath]}
                frontMatter={frontMatter}
                sectionPath={parentPath}
                AppropriateImage={AppropriateImage}
            >
                {children}
            </ExampleIndex>
        ) : (
            <ContentWrapper {...this.props}>{children}</ContentWrapper>
        );
    }
}

Content.propTypes = {
    children: PropTypes.node,
    frontMatter: PropTypes.object.isRequired,
    parentPath: PropTypes.string,
    filters: PropTypes.object,
    AppropriateImage: PropTypes.func,
    layoutConfig: PropTypes.shape({
        showCards: PropTypes.bool
    })
};

export class ContentWrapper extends React.PureComponent {
    renderAside = () => {
        const { frontMatter, layoutConfig } = this.props;
        const { onThisPage } = frontMatter;
        const headings = frontMatter.headings || this.props.headings;

        const showOnThisPage = onThisPage
            ? onThisPage
            : layoutConfig.onThisPage;

        const showToc = headings && headings.length > 0 && showOnThisPage;
        return (
            <aside
                className="scroll-auto-mxl scroll-styled viewport-almost-mxl sticky-mxl"
                style={{ top: '10px' }}
            >
                {this.props.customAside ? this.props.customAside : undefined}
                {showToc && headings && headings.length > 0 && (
                    <OnThisPage
                        headings={headings}
                        themeWrapper="mb36-mxl mb18"
                    />
                )}
            </aside>
        );
    };

    render() {
        const { children, frontMatter, layoutConfig } = this.props;
        const { title, unProse, overviewHeader } = frontMatter;
        const { hideTitle } = layoutConfig;

        // do not show h1 if `hideTitle: true` or `overviewHeader` is enabled
        const showTitle = !hideTitle && !overviewHeader;

        return (
            <div id="docs-content">
                {showTitle && (
                    <div
                        className={classnames('col prose', {
                            'col--8-mxl col--12': layoutConfig.aside !== 'none'
                        })}
                    >
                        <h1 className="txt-fancy">{title}</h1>
                    </div>
                )}
                {overviewHeader && <OverviewHeader {...overviewHeader} />}

                <div className="grid grid--gut60">
                    {(layoutConfig.aside !== 'none' ||
                        this.props.customAside) && (
                        <div className="dr-ui--page-layout-aside col col--12 col--4-mxl">
                            {this.renderAside()}
                        </div>
                    )}

                    <div
                        className={classnames('col', {
                            'col--8-mxl col--12': layoutConfig.aside !== 'none',
                            prose: unProse !== true
                        })}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

ContentWrapper.propTypes = {
    children: PropTypes.node,
    frontMatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        unProse: PropTypes.bool,
        headings: PropTypes.array,
        layout: PropTypes.string,
        overviewHeader: PropTypes.object,
        onThisPage: PropTypes.bool
    }).isRequired,
    headings: PropTypes.array,
    location: PropTypes.object.isRequired,
    parentPath: PropTypes.string,
    filters: PropTypes.object,
    AppropriateImage: PropTypes.func,
    section: PropTypes.string,
    constants: PropTypes.shape({
        SITE: PropTypes.string.isRequired,
        BASEURL: PropTypes.string.isRequired
    }).isRequired,
    layoutConfig: PropTypes.shape({
        layout: PropTypes.string,
        hideTitle: PropTypes.bool,
        showCards: PropTypes.bool,
        aside: PropTypes.string,
        onThisPage: PropTypes.bool
    }),
    navigation: PropTypes.shape({
        hierarchy: PropTypes.object
    }),
    customAside: PropTypes.node
};
