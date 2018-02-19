import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import { Dispatch } from 'redux';

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
                            (testDrivesWaitingForApproval && testDrivesWaitingForApproval.length) ?
                                testDrivesWaitingForApproval.map((testDrive, index) => {
                                    return (<ApprovalPendingItem
                                        key={index}
                                        testDrive={testDrive}
                                        saveTestDriveApprovalLoading={saveTestDriveApprovalLoading}
                                        approveTestDrive={(id) => approveTestDrive(id)} />)
                                }) : 'There are no items waiting for approval.'
                        }
                    </Loader>
                </div>
            </Pane>
            <Pane label="APPROVED TEST DRIVES">
                <Loader show={loading} message={'Loading...'}>
                    {
                        (approvedTestDrives && approvedTestDrives.length) ?
                            approvedTestDrives.map((testDrive, index) => {
                                return (<ApprovalPendingItem
                                    key={index}
                                    testDrive={testDrive}
                                    saveTestDriveApprovalLoading={saveTestDriveApprovalLoading}
                                    approveTestDrive={(id) => approveTestDrive(id)} />)
                            }) : 'There are no approved items.'
                    }
                </Loader>
            </Pane>
        </Tabs >)
    }
}

export default ApprovalPendingContainer;