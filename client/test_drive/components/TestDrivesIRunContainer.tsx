import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import { TestDrive } from '../model';
import Pager from 'react-pager';
import {
    model,
    TestDriveIRunItem,
    editTestDrive,
    deleteTestDrive
} from '../index';
import TestDrivesIRunUpcommingItem from './TestDrivesIRunUpcommingItem';
import TestDrivesIRunCompletedItem from './TestDrivesIRunCompletedItem';
import { Messages } from '../../common/services/constants';
import Services from '../../common/services/services';

interface TestDrivesIRunContainerProps {
    upcommingTestDrivesIRun: TestDrive[]
    upcommingTestDrivesIRunLoading: boolean;
    draftedTestDrivesIRun: TestDrive[];
    draftedTestDrivesIRunLoading: boolean;
    inProgressTestDrivesIRun: TestDrive[];
    inProgressTestDrivesIRunLoading: boolean;
    completedTestDrivesIRun: TestDrive[];
    completedTestDrivesIRunLoading: boolean;
    loadInProgressTestDrivesIRun: (skip: number, top: number) => any;
    loadCompletedTestDrivesIRun: (skp: number, top: number) => any;
    loadUpcommingTestDrivesIRun: (skip: number, top: number) => any;
    loadDraftedTestDrivesIRun: (skip: number, top: number) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        itemsPerPage: 5,
        total: 11,
        draftedItemCurrent: 0,
        upcommingItemCurrent: 0,
        inprogressItemCurrent: 0,
        completedItemsCurrent: 0,
        draftedItems: [],
        upcommingItems: [],
        inprogressItems: [],
        completedItems: [],
        visiblePages: 4,
        visibleItems: [],
        upcommingTestDrivesIRun: [],
        upcommingTestDrivesIRunLoading: false,
        draftedTestDrivesIRun: [],
        draftedTestDrivesIRunLoading: false,
        inProgressTestDrivesIRun: [],
        inProgressTestDrivesIRunLoading: false,
        completedTestDrivesIRun: [],
        completedTestDrivesIRunLoading: false
    }
})
class TestDrivesIRunContainer extends React.Component<TestDrivesIRunContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        var self = this;
        this.props.updateUI({
            upcommingTestDrivesIRunLoading: true,
            draftedTestDrivesIRunLoading: true,
            inProgressTestDrivesIRunLoading: true,
            completedTestDrivesIRunLoading: true
        });
        Services.getUpCommingTestDriveIRun(0, 1000).then(data => {
            self.props.updateUI({
                upcommingTestDrivesIRun: data || [],
                upcommingTestDrivesIRunLoading: false,
            });
            this.initialize();
        });

        Services.getDraftedTestDrivesIRun(0, 1000).then(data => {
            self.props.updateUI({
                draftedTestDrivesIRun: data || [],
                draftedTestDrivesIRunLoading: false,
            });
            this.initialize();
        });

        Services.getCompletedTestDriveIRun(0, 1000).then(data => {
            self.props.updateUI({
                completedTestDrivesIRun: data || [],
                completedTestDrivesIRunLoading: false
            });
            this.initialize();
        });

        Services.getInProgressTestDrivesIRun(0, 1000).then(data => {
            self.props.updateUI({
                inProgressTestDrivesIRun: data || [],
                inProgressTestDrivesIRunLoading: false,
            });
            this.initialize();
        });
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
        } = this.props;

        const {
            upcommingTestDrivesIRun,
            upcommingTestDrivesIRunLoading,
            draftedTestDrivesIRun,
            draftedTestDrivesIRunLoading,
            inProgressTestDrivesIRun,
            inProgressTestDrivesIRunLoading,
            completedTestDrivesIRun,
            completedTestDrivesIRunLoading
        } = ui;

        if (!upcommingTestDrivesIRunLoading && upcommingTestDrivesIRun && upcommingTestDrivesIRun.length && !ui.upcommingItems.length) {
            var currentPage = ui.upcommingItemCurrent;
            if (ui.upcommingItems.length < ui.upcommingItems * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, upcommingTestDrivesIRun, 'upcommingItems', 'upcommingItemCurrent');
        }
        if (!draftedTestDrivesIRunLoading && draftedTestDrivesIRun && draftedTestDrivesIRun.length && !ui.draftedItems.length) {
            var currentPage = ui.draftedItemCurrent;
            if (ui.draftedItemCurrent.length < ui.draftedItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, draftedTestDrivesIRun, 'draftedItems', 'draftedItemCurrent');
        }

        if (!inProgressTestDrivesIRunLoading && inProgressTestDrivesIRun
            && inProgressTestDrivesIRun.length && !ui.inprogressItems.length) {
            var currentPage = ui.inprogressItemCurrent;
            if (ui.inprogressItems.length < ui.inprogressItems * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, inProgressTestDrivesIRun, 'inprogressItems', 'inprogressItemCurrent')

        }

        if (!completedTestDrivesIRunLoading && completedTestDrivesIRun
            && completedTestDrivesIRun.length && !ui.completedItems.length) {
            var currentPage = ui.completedItemsCurrent;
            if (ui.completedItemsCurrent.length < ui.completedItemsCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, completedTestDrivesIRun, 'completedItems', 'completedItemsCurrent');
        }
    }


    render() {
        const {
            ui, updateUI,
        } = this.props;

        const {
            upcommingTestDrivesIRun,
            upcommingTestDrivesIRunLoading,
            draftedTestDrivesIRun,
            draftedTestDrivesIRunLoading,
            inProgressTestDrivesIRun,
            inProgressTestDrivesIRunLoading,
            completedTestDrivesIRun,
            completedTestDrivesIRunLoading
        } = ui;

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
                    <Pane label="TEST DRIVES IN PROGRESS">
                        <div>
                            <Loader show={inProgressTestDrivesIRunLoading} message={'Loading...'}>
                                {
                                    (!inProgressTestDrivesIRunLoading && ui.inprogressItems && ui.inprogressItems.length) ?
                                        ui.inprogressItems.map((testDriveObj, index) => {
                                            return (<TestDrivesIRunCompletedItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive} />)
                                        }) : (!inProgressTestDrivesIRunLoading &&
                                            <div className="no-data-message">{Messages.TEST_DRIVE_INPROGRESS_MSG}</div>)
                                }
                                {
                                    ui.inprogressItems && ui.inprogressItems.length > 0 &&
                                    <Pager
                                        total={Math.ceil(inProgressTestDrivesIRun.length / ui.itemsPerPage)}
                                        current={ui.inprogressItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) =>
                                            this.getVisibleItems(newPage, inProgressTestDrivesIRun, 'inprogressItems', 'inprogressItemCurrent')}
                                    />
                                }

                            </Loader>
                        </div>
                    </Pane>


                    <Pane label="UPCOMING TEST DRIVES">
                        <div>
                            <Loader show={upcommingTestDrivesIRunLoading} message={'Loading...'}>
                                {
                                    (!upcommingTestDrivesIRunLoading && ui.upcommingItems && ui.upcommingItems.length) ?
                                        ui.upcommingItems.map((testDriveObj, index) => {
                                            return (<TestDrivesIRunUpcommingItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive} />)
                                        }) : (!upcommingTestDrivesIRunLoading && <div className="no-data-message">{Messages.TEST_DRIVE_UPCOMING_MSG}</div>)
                                }
                                {
                                    ui.upcommingItems && ui.upcommingItems.length > 0 &&
                                    <Pager
                                        total={Math.ceil(upcommingTestDrivesIRun.length / ui.itemsPerPage)}
                                        current={ui.upcommingItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, upcommingTestDrivesIRun, 'upcommingItems', 'upcommingItemCurrent')}
                                    />
                                }

                            </Loader>
                        </div>
                    </Pane>
                    <Pane label="COMPLETED TEST DRIVES">
                        <div>
                            <Loader show={completedTestDrivesIRunLoading} message={'Loading...'}>
                                {
                                    (!completedTestDrivesIRunLoading && ui.completedItems && ui.completedItems.length) ?
                                        ui.completedItems.map((testDriveObj, index) => {
                                            return (<TestDrivesIRunCompletedItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive} />)
                                        }) : (!completedTestDrivesIRunLoading &&
                                            <div className="no-data-message">{Messages.TEST_DRIVE_COMPLETED_MSG}</div>)
                                }
                                {
                                    !completedTestDrivesIRunLoading && ui.completedItems && ui.completedItems.length > 0 &&
                                    <Pager
                                        total={Math.ceil(completedTestDrivesIRun.length / ui.itemsPerPage)}
                                        current={ui.completedItemsCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, completedTestDrivesIRun,
                                            'completedItems', 'completedItemsCurrent')}
                                    />
                                }
                            </Loader>
                        </div>
                    </Pane>
                    <Pane label="DRAFTED TEST DRIVES">
                        <div>
                            <Loader show={draftedTestDrivesIRunLoading} message={'Loading...'}>
                                {
                                    (!draftedTestDrivesIRunLoading && ui.draftedItems && ui.draftedItems.length) ?
                                        ui.draftedItems.map((testDriveObj, index) => {
                                            return (<TestDrivesIRunUpcommingItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive} />)
                                        }) : (!draftedTestDrivesIRunLoading && <div className="no-data-message">{Messages.TEST_DRIVE_DRAFTED_MSG}</div>)
                                }
                                {
                                    !draftedTestDrivesIRunLoading && ui.draftedItems && ui.draftedItems.length > 0 &&
                                    <Pager
                                        total={Math.ceil(draftedTestDrivesIRun.length / ui.itemsPerPage)}
                                        current={ui.draftedItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, draftedTestDrivesIRun, 'draftedItems', 'draftedItemCurrent')}
                                    />
                                }
                            </Loader>
                        </div>
                    </Pane>
                </Tabs>
            </div>


        )
    }
}

export default TestDrivesIRunContainer;
