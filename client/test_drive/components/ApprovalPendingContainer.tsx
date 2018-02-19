import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import { Dispatch } from 'redux';
import Pager from 'react-pager';
import ui from 'redux-ui';

import {
    ApprovalPendingItem,
    model,
} from '../../test_drive';

interface ApprovalPendingContainerProps {
    approvedTestDrives: model.TestDrive[];
    approvedTestDrivesLoading: boolean;
    testDrivesWaitingForApproval: model.TestDrive[];
    testDrivesWaitingForApprovalLoading: boolean;
    saveTestDriveApprovalLoading: boolean;
    loadApprovedTestDrives: (skip: number, top: number) => any;
    loadTestDrivesWaitingFormApproval: (skip: number, top: number) => any;
    approveTestDrive: (id) => any;
    updateUI: (any) => any;
    ui: any;
};
@ui({
    state: {
        itemsPerPage: 5,
        total: 11,
        pendingItemCurrent: 0,
        approvedItemCurrent: 0,
        pendingItems: [],
        approvedItems: [],
        visiblePages: 4,
        visibleItems: []
    }
})
class ApprovalPendingContainer extends React.Component<ApprovalPendingContainerProps> {
    constructor(props, context) {
        super(props, context);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.getVisibleItems = this.getVisibleItems.bind(this);
    }

    componentDidMount() {
        this.props.loadApprovedTestDrives(0, 100);
        this.props.loadTestDrivesWaitingFormApproval(0, 100);
    }

    getVisibleItems(newPage, array, visibleItems, currentPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    handlePageChanged(newPage, array, visibleItems, currentPage) {
        this.getVisibleItems(newPage, array, visibleItems, currentPage);
    }

    render() {
        if (this.props.approvedTestDrives && this.props.approvedTestDrives.length && !this.props.ui.approvedItems.length) {
            this.getVisibleItems(this.props.ui.approvedItemCurrent, this.props.approvedTestDrives.length, 'approvedItems', 'approvedItemCurrent');
        }
        if (this.props.testDrivesWaitingForApproval && this.props.testDrivesWaitingForApproval.length && !this.props.ui.pendingItems.length) {
            this.getVisibleItems(this.props.ui.pendingItemCurrent, this.props.testDrivesWaitingForApproval, 'pendingItems', 'pendingItemCurrent');
        }
        const {
            ui, updateUI,
            approvedTestDrives,
            approvedTestDrivesLoading,
            testDrivesWaitingForApproval,
            testDrivesWaitingForApprovalLoading,
            approveTestDrive,
            saveTestDriveApprovalLoading
        } = this.props;
        const loading = testDrivesWaitingForApprovalLoading || saveTestDriveApprovalLoading;
        return (<Tabs selected={0}>

            <Pane label="PENDING APPROVAL">
                <div>
                    <Loader show={loading} message={'Loading...'}>
                        {
                            (ui.pendingItems && ui.pendingItems.length) ?
                                ui.pendingItems.map((testDrive, index) => {
                                    return (<ApprovalPendingItem
                                        key={index}
                                        testDrive={testDrive}
                                        saveTestDriveApprovalLoading={saveTestDriveApprovalLoading}
                                        approveTestDrive={(id) => approveTestDrive(id)} />)
                                }) : 'There are no items waiting for approval.'
                        }
                        {
                            ui.pendingItems && ui.pendingItems.length > 0 &&
                            <Pager
                                total={Math.ceil(testDrivesWaitingForApproval.length / ui.itemsPerPage)}
                                current={ui.pendingItemCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.handlePageChanged(newPage, testDrivesWaitingForApproval, 'pendingItems', 'pendingItemCurrent')}
                            />
                        }

                    </Loader>
                </div>
            </Pane>
            <Pane label="APPROVED TEST DRIVES">
                <div>
                    <Loader show={loading} message={'Loading...'}>
                        {
                            (ui.approvedItems && ui.approvedItems.length) ?
                                ui.approvedItems.map((testDrive, index) => {
                                    return (<ApprovalPendingItem
                                        key={index}
                                        testDrive={testDrive}
                                        saveTestDriveApprovalLoading={saveTestDriveApprovalLoading}
                                        approveTestDrive={(id) => approveTestDrive(id)} />)
                                }) : 'There are no items waiting for approval.'
                        }
                        {
                            ui.approvedItems && ui.approvedItems.length > 0 &&
                            <Pager
                                total={Math.ceil(approvedTestDrives.length / ui.itemsPerPage)}
                                current={ui.approvedItemCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.handlePageChanged(newPage, approvedTestDrives, 'approvedItems', 'approvedItemCurrent')}
                            />
                        }

                    </Loader>
                </div>
            </Pane>
        </Tabs >)
    }
}

export default ApprovalPendingContainer;