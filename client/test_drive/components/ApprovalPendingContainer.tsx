import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import { Dispatch } from 'redux';
import Pager from 'react-pager';
import ui from 'redux-ui';
import Services from '../../common/services/services';
import Popup from '../../common/components/Popups';
import * as $ from 'jquery';
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
        title: "Approved",
        approvedMessage: "Test drive approved successfully.",
        itemsPerPage: 5,
        total: 11,
        pendingItemCurrent: 0,
        approvedItemCurrent: 0,
        pendingItems: [],
        approvedItems: [],
        visiblePages: 4,
        visibleItems: [],
        approvedTestDrives: [],
        approvedTestDrivesLoading: false,
        testDrivesWaitingForApproval: [],
        testDrivesWaitingForApprovalLoading: false
    }
})
class ApprovalPendingContainer extends React.Component<ApprovalPendingContainerProps> {
    constructor(props, context) {
        super(props, context);
        this.getVisibleItems = this.getVisibleItems.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        var self = this;
        self.props.updateUI({
            approvedItems: [],
            pendingItems: [],
            approvedTestDrivesLoading: true,
            testDrivesWaitingForApprovalLoading: true
        });
        Services.getApprovedTestDrives(0, 1000).then(data => {
            self.props.updateUI({
                approvedItems: [],
                pendingItems: [],
                approvedTestDrives: data || [],
                approvedTestDrivesLoading: false,
            });
            this.initialize();
        });

        Services.getTestDrivesWaitingForApproval(0, 1000).then(data => {
            self.props.updateUI({
                approvedItems: [],
                pendingItems: [],
                testDrivesWaitingForApproval: data || [],
                testDrivesWaitingForApprovalLoading: false
            });
            this.initialize();
        });
    }

    approveTestDrive(id) {
        var self = this;
        this.props.updateUI({
            approvedItems: [],
            pendingItems: [],
            approvedTestDrivesLoading: true,
            testDrivesWaitingForApprovalLoading: true
        });
        Services.approveTestdrive(id).then(data => {
            self.props.updateUI({ approvedMessage: Messages.TEST_DRIVE_APPROVED, title: "Success!" });    
            this.getData();
            $("#popupTestDriveApprovalSuccess").trigger('click');

        })
    }

    getVisibleItems(newPage: number, array: any[], visibleItems: string, currentPage: string) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    initialize() {
        const {
            ui, updateUI,
            approveTestDrive,
            saveTestDriveApprovalLoading
        } = this.props;

        const {
            approvedTestDrives,
            approvedTestDrivesLoading,
            testDrivesWaitingForApproval,
            testDrivesWaitingForApprovalLoading
        } = ui;

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
            this.getVisibleItems(currentPage, testDrivesWaitingForApproval, 'pendingItems', 'pendingItemCurrent');
        }

    }

    approvedAlertButtons = [{
        name: 'Ok',
        link: '#'
    }]

    render() {
        const {
            ui, updateUI,
            approveTestDrive,
            saveTestDriveApprovalLoading
        } = this.props;

        const {
            approvedTestDrives,
            approvedTestDrivesLoading,
            testDrivesWaitingForApproval,
            testDrivesWaitingForApprovalLoading
        } = ui;


        const loading = testDrivesWaitingForApprovalLoading || saveTestDriveApprovalLoading;
        this.initialize()
        return (
            <div>
                {ui.isCreaseTestDriveVisible ? <div className="centralbox_button">
                    <div className="button type1 nextBtn btn-lg pull-right animated_button">
                        <Link to={"/testdrive"} >Create Test Drive</Link>
                    </div>
                </div> : ''
                // <div className="centralbox_button">
                //     <div className="button type1 nextBtn btn-lg pull-right animated_button">
                //         <a href="javascript:;" onClick={() => Services.requestAccess()} >Become Drive Owner</a>
                //     </div>
                // </div>
                }


                <Tabs selected={0}>
                    <Pane label="PENDING APPROVAL">
                        <div>
                            <Loader show={loading} message={'Loading...'}>
                                {
                                    (!loading && ui.pendingItems && ui.pendingItems.length) ?
                                        ui.pendingItems.map((testDrive, index) => {
                                            return (<ApprovalPendingItem
                                                key={index}
                                                testDrive={testDrive}
                                                saveTestDriveApprovalLoading={saveTestDriveApprovalLoading}
                                                approveTestDrive={(id) => this.approveTestDrive(id)} />)
                                        }) : (!loading && <div className="no-data-message">{Messages.TEST_DRIVE_PENDING_MSG}</div>)
                                }
                                {
                                    !loading && ui.pendingItems && ui.pendingItems.length > 0 &&
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
                                    (!loading && ui.approvedItems && ui.approvedItems.length) ?
                                        ui.approvedItems.map((testDrive, index) => {
                                            return (<ApprovalPendingItem
                                                key={index}
                                                testDrive={testDrive}
                                                saveTestDriveApprovalLoading={saveTestDriveApprovalLoading}
                                                approveTestDrive={(id) => approveTestDrive(id)} />)
                                        }) : (!loading && <div className="no-data-message">{Messages.TEST_DRIVE_APPROVED_MSG}</div>)
                                }
                                {
                                    !loading && ui.approvedItems && ui.approvedItems.length > 0 &&
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
                <Popup popupId="TestDriveApprovalSuccess" title={ui.title}
                    body={ui.approvedMessage}
                    buttons={this.approvedAlertButtons} />
            </div>)
    }
}

export default ApprovalPendingContainer;