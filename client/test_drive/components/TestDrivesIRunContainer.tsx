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
import { Messages } from '../../common/services/constants';

interface TestDrivesIRunContainerProps {
    upcommingTestDrivesIRun: TestDrive[]
    upcommingTestDrivesIRunLoading: boolean;
    draftedTestDrivesIRun: TestDrive[];
    draftedTestDrivesIRunLoading: boolean;
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
        draftedItems: [],
        upcommingItems: [],
        visiblePages: 4,
        visibleItems: []
    }
})
class TestDrivesIRunContainer extends React.Component<TestDrivesIRunContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadUpcommingTestDrivesIRun(0, 100);
        this.props.loadDraftedTestDrivesIRun(0, 100);
    }

    getVisibleItems(newPage: number, array: any[], visibleItems: string, currentPage: string) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    render() {
        const {
            ui, updateUI,
            upcommingTestDrivesIRun,
            upcommingTestDrivesIRunLoading,
            draftedTestDrivesIRun,
            draftedTestDrivesIRunLoading
        } = this.props;

        if (!upcommingTestDrivesIRunLoading && upcommingTestDrivesIRun && upcommingTestDrivesIRun.length && !ui.upcommingItems.length) {
            var currentPage = ui.upcommingItemCurrent;
            if(ui.upcommingItems.length < ui.upcommingItemCurrent * ui.itemsPerPage ){
                currentPage = currentPage - 1;      
            }
            this.getVisibleItems(currentPage, upcommingTestDrivesIRun, 'upcommingItems', 'upcommingItemCurrent');
        }
        if (!draftedTestDrivesIRunLoading && draftedTestDrivesIRun && draftedTestDrivesIRun.length && !ui.draftedItems.length) {
            var currentPage = ui.draftedItemCurrent;
            if(ui.draftedItems.length < ui.draftedItemCurrent * ui.itemsPerPage ){
                currentPage = currentPage - 1;      
            }
            this.getVisibleItems(currentPage, draftedTestDrivesIRun, 'draftedItems', 'draftedItemCurrent');
        }
        


        return (
            <div>
                <div className="centralbox_button">
               <div className="button type1 nextBtn btn-lg pull-right animated_button">
                    <Link to={"/testdrive"} >Create Test Drive</Link>
                </div>
                </div>
                <Tabs selected={0}>
                    <Pane label="UPCOMING TEST DRIVES">
                        <div>
                            <Loader show={upcommingTestDrivesIRunLoading} message={'Loading...'}>
                                {
                                    (ui.upcommingItems && ui.upcommingItems.length) ?
                                        ui.upcommingItems.map((testDriveObj, index) => {
                                            return (<TestDrivesIRunUpcommingItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive}/>)
                                        }) : (!upcommingTestDrivesIRunLoading && Messages.TEST_DRIVE_UPCOMING_MSG)
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
                    <Pane label="DRAFTED TEST DRIVES">
                        <div>
                            <Loader show={draftedTestDrivesIRunLoading} message={'Loading...'}>
                                {
                                    (ui.draftedItems && ui.draftedItems.length) ?
                                        ui.draftedItems.map((testDriveObj, index) => {
                                            return (<TestDrivesIRunUpcommingItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive}/>)
                                        }) : (!draftedTestDrivesIRunLoading && <div className="no-data-message">Messages.TEST_DRIVE_DRAFTED_MSG</div>)
                                }
                                {
                                    ui.draftedItems && ui.draftedItems.length > 0 &&
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
