import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import Pager from 'react-pager';
import Services from '../../common/services/services';
<<<<<<< HEAD
import Promise from "ts-promise";
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
import {
    model,
    loadMyCompletedTestDrives,
    MyTestDrivesCompletedItem,
    MyTestDrivesInProgressItem
} from '../../test_drive';
<<<<<<< HEAD
import { Messages } from '../../common/services/constants';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

interface MyTestDrivesContainerProps {
    myCompletedTestDrives: model.MyTestDrive[]
    myCompletedTestDrivesLoading: boolean,
    myInprogressTestDrives: model.MyTestDrive[],
    myInprogressTestDrivesLoading: boolean,
    loadMyCompletedTestDrives: (skip: number, top: number) => any;
    loadMyInprogressTestDrives: (skip: number, top: number) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        itemsPerPage: 3,
        total: 11,
        completedItemCurrent: 0,
        inprogressItemCurrent: 0,
        completedItems: [],
        inprogressItems: [],
        visiblePages: 4,
<<<<<<< HEAD
        visibleItems: [],
        myCompletedTestDrivesLoading: false,
        myCompletedTestDrives: [],
        myInprogressTestDrivesLoading: false,
        myInprogressTestDrives: []
=======
        visibleItems: []
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }
})
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
<<<<<<< HEAD
    }

    componentDidMount() {
        var self = this;
        self.props.updateUI({
            myCompletedTestDrivesLoading: true,
            myInprogressTestDrivesLoading: true,
        });

        Services.getMyCompletedTestDrives(0, 1000).then(data => {

            self.props.updateUI({
                myCompletedTestDrivesLoading: false,
                myCompletedTestDrives: data || [],
            });
            this.initialize();

        });

        Services.getMyInProgressTestDrives(0, 1000).then(data => {

            self.props.updateUI({
                myInprogressTestDrivesLoading: false,
                myInprogressTestDrives: data || []
            });
            this.initialize();

        });
=======
        this.initialize();
    }

    componentDidMount() {
        this.props.loadMyCompletedTestDrives(0, 1000);
        this.props.loadMyInprogressTestDrives(0, 1000);
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }


    getVisibleItems(newPage: number, array: any[], visibleItems: string, currentPage: string) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

<<<<<<< HEAD
    initialize() {
        const { ui, updateUI } = this.props;
        const {
            myCompletedTestDrivesLoading,
            myCompletedTestDrives,
            myInprogressTestDrives,
            myInprogressTestDrivesLoading
        } = ui;
=======
    componentWillUpdate(){
        this.initialize();
    }

    initialize(){
        const { myCompletedTestDrives, myCompletedTestDrivesLoading, myInprogressTestDrives,
            myInprogressTestDrivesLoading, ui, updateUI,
            loadMyInprogressTestDrives, loadMyCompletedTestDrives } = this.props;
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

        if (!myCompletedTestDrivesLoading && myCompletedTestDrives && myCompletedTestDrives.length && !ui.completedItems.length) {
            var currentPage = ui.completedItemCurrent;
            if (ui.completedItems.length < ui.completedItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent');
        }
        if (!myInprogressTestDrivesLoading && myInprogressTestDrives && myInprogressTestDrives.length && !ui.inprogressItems.length) {
            var currentPage = ui.inprogressItemCurrent;
            if (ui.inprogressItems.length < ui.inprogressItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
<<<<<<< HEAD
            this.getVisibleItems(currentPage, myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent');
=======
            this.getVisibleItems(currentPage, this.props.myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent');
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
        }
    }

    render() {
<<<<<<< HEAD
        const { ui, updateUI, loadMyInprogressTestDrives, loadMyCompletedTestDrives } = this.props;
        const {
            myCompletedTestDrivesLoading,
            myCompletedTestDrives,
            myInprogressTestDrives,
            myInprogressTestDrivesLoading
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
                            <Loader show={myInprogressTestDrivesLoading} message={'Loading...'}>
                                {
                                    (!myInprogressTestDrivesLoading && ui.inprogressItems && ui.inprogressItems.length) ?
                                        ui.inprogressItems.map((testDriveObj: any, index) => {
                                            return (<MyTestDrivesCompletedItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive}
                                                participants={testDriveObj.participants}
                                                testDriveResponse={testDriveObj.testDriveResponse}
                                                checkPortion={'inProgressTestDrive'}
                                                index={index}
                                                isCompleted={false}
                                            />)
                                        }) : (!myInprogressTestDrivesLoading && <div className="no-data-message">{Messages.TEST_DRIVE_INPROGRESS_MSG}</div>)
                                }
                                {
                                    (!myInprogressTestDrivesLoading && ui.inprogressItems && ui.inprogressItems.length > 0) ?
                                        <div className="col-md-12">
                                            <Pager
                                                total={Math.ceil(myInprogressTestDrives.length / ui.itemsPerPage)}
                                                current={ui.inprogressItemCurrent}
                                                visiblePages={ui.visiblePages}
                                                titles={{ first: '<', last: '>' }}
                                                className="pagination-sm pull-right"
                                                onPageChanged={(newPage) => this.getVisibleItems(newPage, myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent')}
                                            />
                                        </div> : ''

                                }

                            </Loader>
                        </div>
                    </Pane>
                    <Pane label="COMPLETED TEST DRIVES">
                        <div>
                            <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                                <div className="row">{
                                    (!myCompletedTestDrivesLoading && ui.completedItems && ui.completedItems.length) ?
                                        ui.completedItems.map((testDriveObj, index) => {
                                            return (<MyTestDrivesCompletedItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive}
                                                participants={testDriveObj.participants}
                                                testDriveResponse={testDriveObj.testDriveResponse}
                                                checkPortion={'completedTestDrive'}
                                                index={index}
                                                isCompleted={true}
                                            />)
                                        }) : (!myCompletedTestDrivesLoading && <div className="no-data-message">{Messages.TEST_DRIVE_COMPLETED_MSG}</div>)
                                } </div>
                                {
                                    (!myCompletedTestDrivesLoading && ui.completedItems && ui.completedItems.length > 0) ?
                                        <div className="col-md-12">
                                            <Pager
                                                total={Math.ceil(myCompletedTestDrives.length / ui.itemsPerPage)}
                                                current={ui.completedItemCurrent}
                                                visiblePages={ui.visiblePages}
                                                titles={{ first: '<', last: '>' }}
                                                className="pagination-sm pull-right"
                                                onPageChanged={(newPage) => this.getVisibleItems(newPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent')}
                                            />
                                        </div> : ''
                                }
                            </Loader>
                        </div>
                    </Pane>
                </Tabs>
            </div>)
=======
        const { myCompletedTestDrives, myCompletedTestDrivesLoading, myInprogressTestDrives,
            myInprogressTestDrivesLoading, ui, updateUI,
            loadMyInprogressTestDrives, loadMyCompletedTestDrives } = this.props;
        return (<Tabs selected={0}>
            <Pane label="TEST DRIVES IN PROGRESS">
                <div>
                    <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                        {
                            (ui.inprogressItems && ui.inprogressItems.length) ?
                                ui.inprogressItems.map((testDriveObj: any, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj.testDrive}
                                        participants={testDriveObj.participants}
                                        testDriveResponse={testDriveObj.testDriveResponse}
                                        checkPortion={'inProgressTestDrive'}
                                        index={index}
                                        isCompleted={false}
                                    />)
                                }) : (!myInprogressTestDrivesLoading && 'There are no items in this view.')
                        }
                        {
                            ui.inprogressItems && ui.inprogressItems.length > 0 ?
                                <div className="row">
                                    <Pager
                                        total={Math.ceil(myInprogressTestDrives.length / ui.itemsPerPage)}
                                        current={ui.inprogressItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent')}
                                    />
                                </div> : ''

                        }

                    </Loader>
                </div>
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                <div>
                    <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                        <div className="row">{
                            (ui.completedItems && ui.completedItems.length) ?
                                ui.completedItems.map((testDriveObj, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj.testDrive}
                                        participants={testDriveObj.participants}
                                        testDriveResponse={testDriveObj.testDriveResponse}
                                        checkPortion={'completedTestDrive'}
                                        index={index}
                                        isCompleted={true}
                                    />)
                                }) : (!myCompletedTestDrivesLoading && 'There are no items in this view.')
                        } </div>
                        {
                            ui.completedItems && ui.completedItems.length > 0 ?
                                <div className="row">
                                    <Pager
                                        total={Math.ceil(myCompletedTestDrives.length / ui.itemsPerPage)}
                                        current={ui.completedItemCurrent}
                                        visiblePages={ui.visiblePages}
                                        titles={{ first: '<', last: '>' }}
                                        className="pagination-sm pull-right"
                                        onPageChanged={(newPage) => this.getVisibleItems(newPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent')}
                                    />
                                </div> : ''

                        }
                    </Loader>
                </div>
            </Pane>
        </Tabs>)
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }
}

export default MyTestDrivesContainer;
