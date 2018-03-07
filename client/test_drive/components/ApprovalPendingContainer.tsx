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
import { Messages } from '../../common/services/constants';

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
        this.getVisibleItems = this.getVisibleItems.bind(this);
    }

    componentDidMount() {
        this.props.loadApprovedTestDrives(0, 100);
        this.props.loadTestDrivesWaitingFormApproval(0, 100);
    }

    getVisibleItems(newPage: number, array: any[], visibleItems: string, currentPage: string) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    approveTestDrive(id) {
        this.props.updateUI({
            pendingItems: [],
            approvedItems: [],
        });
        this.props.approveTestDrive(id);
        window.location.href = window.location.href;
    }
    render() {
        const {
            ui, updateUI,
            approvedTestDrives,
            approvedTestDrivesLoading,
            testDrivesWaitingForApproval,
            testDrivesWaitingForApprovalLoading,
            approveTestDrive,
            saveTestDriveApprovalLoading
        } = this.props;

        if (!saveTestDriveApprovalLoading && approvedTestDrives && approvedTestDrives.length && !ui.approvedItems.length) {
            var currentPage = ui.approvedItemCurrent;
            if (ui.approvedItems.length < ui.approvedItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, approvedTestDrives, 'approvedItems', 'approvedItemCurrent');
        }
        if (!saveTestDriveApprovalLoading && testDrivesWaitingForApproval && testDrivesWaitingForApproval.length && !ui.pendingItems.length) {
            var currentPage = ui.pendingItemCurrent;
            if (ui.pendingItems.length < ui.pendingItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, this.props.testDrivesWaitingForApproval, 'pendingItems', 'pendingItemCurrent');
        }

        const loading = testDrivesWaitingForApprovalLoading || saveTestDriveApprovalLoading;
        return (
            <div>
                {ui.isCreaseTestDriveVisible ? <div className="centralbox_button">
                    <div className="button type1 nextBtn btn-lg pull-right animated_button">
                        <Link to={"/testdrive"} >Create Test Drive</Link>
                    </div>
                </div> : ''}
                <Tabs selected={0}>

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
                                                approveTestDrive={(id) => this.approveTestDrive(id)} />)
                                        }) : (!loading && <div className="no-data-message">{Messages.TEST_DRIVE_PENDING_MSG}</div>)
                                }
                                {
                                    ui.pendingItems && ui.pendingItems.length > 0 &&
                                    <Pager
                                        total={Math.ceil(testDrivesWaitingForApproval.length / ui.itemsPerPage)}
                                        current={ui.pendingItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, testDrivesWaitingForApproval, 'pendingItems', 'pendingItemCurrent')}
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
                                        }) : (!loading && <div className="no-data-message">{Messages.TEST_DRIVE_APPROVED_MSG}</div>)
                                }
                                {
                                    ui.approvedItems && ui.approvedItems.length > 0 &&
                                    <Pager
                                        total={Math.ceil(approvedTestDrives.length / ui.itemsPerPage)}
                                        current={ui.approvedItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, approvedTestDrives, 'approvedItems', 'approvedItemCurrent')}
                                    />
                                }

                            </Loader>
                        </div>
                    </Pane>
                </Tabs >
            </div>)
    }
}

export default ApprovalPendingContainer;