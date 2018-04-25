import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import { Dispatch } from 'redux';
import Pager from 'react-Pager';
import ui from 'redux-ui';

import {
    ApprovalPendingItem,
    model,
} from '../../test_drive';

interface PagingState {
    currentPage: number;
    visibleItems: any[];
};

interface PagingProps {
    itemArray: any[];
    itemsPerPage: number;
    visiblePages: number;
    itemPerBatch: number;
    itemTemplateName: string;
    itemProps: any;
};

class Paging extends React.Component<PagingProps, PagingState> {
    constructor(props, context) {
        super(props, context);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.getVisibleItems = this.getVisibleItems.bind(this);

    }
    componentDidMount() {
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.itemsPerPage;
        this.setState({
            currentPage: newPage,
            visibleItems: this.props.itemArray.slice(skip, skip + this.props.itemsPerPage)
        });
    }

    handlePageChanged(newPage) {
        this.getVisibleItems(newPage);
    }

    render() {
        const {
            itemArray,
            itemsPerPage,
            visiblePages,
            itemPerBatch,
            itemProps
        } = this.props;

        const ItemTemplate = this.props.itemTemplateName;

        return (<div>
            {
                (this.state.visibleItems && this.state.visibleItems.length) ?
                    ui.pendingItems.map((item, index) => {
                        return (<ItemTemplate
                            key={index}
                            item={item}
                            itemProps={itemProps} />)
                    }) : 'There are no items waiting for approval.'
            }
            {
                ui.pendingItems && ui.pendingItems.length > 0 &&
                <Pager
                    total={Math.ceil(this.state.visibleItems.length / itemsPerPage)}
                    current={this.state.currentPage}
                    visiblePages={visiblePages}
                    titles={{
                        first:   '<<',
                        prev:    '<',
                        next:    '>',
                        last:    '>>'
                    }}
                    className="pagination-sm pull-right"
                    onPageChanged={this.handlePageChanged} />
            }


        </div>)
    }
}

export default Paging;