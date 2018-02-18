import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import { Dispatch } from 'redux';

import {
    ApprovalPendingItem,
    loadApprovedTestDrives,
    loadTestDrivesWaitingForApproval,
    model,
} from '../../test_drive';

interface ApprovalPendingContainerProps {
    approvedTestDrives: model.TestDrive[],
    approvedTestDrivesLoading: boolean,
    testDrivesWaitingForApproval: model.TestDrive[],
    testDrivesWaitingForApprovalLoading: boolean
    loadApprovedTestDrives: (skip: number, top: number) => any;
    loadTestDrivesWaitingFormApproval: (skip: number, top: number) => any;
    approveTestDrive: (id) => any;
};

class ApprovalPendingContainer extends React.Component<ApprovalPendingContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadApprovedTestDrives(0, 100);
        this.props.loadTestDrivesWaitingFormApproval(0, 100);
    }

    render() {
        const {
            approvedTestDrives,
            approvedTestDrivesLoading,
            testDrivesWaitingForApproval,
            testDrivesWaitingForApprovalLoading
        } = this.props;

        return (<Tabs selected={0}>
            <Pane label="PENDING APPROVAL">
                {
                    (testDrivesWaitingForApproval && testDrivesWaitingForApproval.length) ? testDrivesWaitingForApproval.map(testDrive => {
                        <ApprovalPendingItem testDrive={testDrive} />
                    }) : ''
                }
            </Pane>
            <Pane label="APPROVED TEST DRIVES">
                {
                    (approvedTestDrives && approvedTestDrives.length) ? approvedTestDrives.map(testDrive => {
                        <ApprovalPendingItem testDrive={testDrive} />
                    }) : ''
                }
            </Pane>
        </Tabs>)
    }
}

export default ApprovalPendingContainer;