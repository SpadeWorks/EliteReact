import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import Loader from 'react-loader-advanced';
import Pager from 'react-pager';
import ui from 'redux-ui';
<<<<<<< HEAD
import Services from '../../common/services/services';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
import {
    TestDriveCardItem,
    model,
} from '../../test_drive';
<<<<<<< HEAD
import { Messages } from '../../common/services/constants';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc


interface ActiveTestDrivesContainerProps {
    activeTestDrives: model.TestDrive[];
    activeTestDrivesLoading: boolean;
    loadActiveTestDrives: (skip: number, top: number) => any;
    updateUI: (any) => any;
    ui: any;
};


@ui({
    state: {
        itemsPerPage: 3,
        total: 11,
        current: 0,
        visibleItems: [],
        visiblePages: 4,
<<<<<<< HEAD
        activeTestDrives: [],
        activeTestDrivesLoading: false
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }
})
class ActiveTestDrivesContainer extends React.Component<ActiveTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
<<<<<<< HEAD
        var self = this;
        self.props.updateUI({
            activeTestDrivesLoading: true
        });
        Services.getActiveTestDrives(0, 1000).then(data => {
            self.props.updateUI({
                activeTestDrives: data || [],
                activeTestDrivesLoading: false
            });
            this.initialize();
        })
=======
        this.props.loadActiveTestDrives(0, 100);
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
<<<<<<< HEAD
            visibleItems: this.props.ui.activeTestDrives.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    initialize() {
        const { ui, updateUI } = this.props;
        const {
            activeTestDrivesLoading,
            activeTestDrives
        } = ui;
=======
            visibleItems: this.props.activeTestDrives.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    render() {
        const { activeTestDrives, activeTestDrivesLoading, ui, updateUI } = this.props;
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

        if (!activeTestDrivesLoading && activeTestDrives && activeTestDrives.length && !ui.visibleItems.length) {
            var currentPage = ui.current;
            if ((ui.visibleItems.length < ui.visibleItems * ui.itemsPerPage) && ui.current != 0) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage);
        }

<<<<<<< HEAD
    }

    render() {
        const { ui, updateUI } = this.props;
        const {
            activeTestDrivesLoading,
            activeTestDrives
        } = ui;
        this.initialize();

        return (<div>
            {ui.isCreaseTestDriveVisible ? <div className="centralbox_button row">
                <div className="button type1 nextBtn btn-lg pull-right animated_button">
                    <Link to={"/testdrive"} >Create Test Drive</Link>
                </div>
            </div> : ''  
            // <div className="centralbox_button row">
            //         <div className="button type1 nextBtn btn-lg pull-right animated_button">
            //             <a href="javascript:;" onClick={() => Services.requestAccess()} >Become Drive Owner</a>
            //         </div>
            //     </div>
            }

            <Loader show={activeTestDrivesLoading || false} message={'Loading...'}>
                {
                    (!activeTestDrivesLoading && ui.visibleItems && ui.visibleItems.length) ?
                        ui.visibleItems.map((testDriveObj, index) => {
                            return (<TestDriveCardItem
                                key={index}
                                participants={testDriveObj.participants}
                                testDrive={testDriveObj.testDrive}
                                isActive={false} />)
                        }) : (!activeTestDrivesLoading && <div className="no-data-message">{Messages.TEST_DRIVE_ACTIVE_MSG}</div>)
                }
                {

                    (!activeTestDrivesLoading && ui.visibleItems && ui.visibleItems.length > 0) ?
                        <div className="col-md-12">
                            <Pager
                                total={Math.ceil(activeTestDrives.length / ui.itemsPerPage)}
                                current={ui.current}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.getVisibleItems(newPage)}
                            />
                        </div> : ''
=======
        return (<div>
            <Loader show={activeTestDrivesLoading || false} message={'Loading...'}>
                {
                    (ui.visibleItems && ui.visibleItems.length) ?
                        ui.visibleItems.map((testDriveObj, index) => {
                            return (<TestDriveCardItem
                                key={index}
                                participants={testDriveObj.participents}
                                testDrive={testDriveObj.testDrive}
                                isActive={true} />)
                        }) : (!activeTestDrivesLoading && 'There are no active test drives.')
                }
                {
                    ui.visibleItems && ui.visibleItems.length > 0 &&
                    <Pager
                        total={Math.ceil(activeTestDrives.length / ui.itemsPerPage)}
                        current={ui.current}
                        visiblePages={ui.visiblePages}
                        titles={{ first: '<', last: '>' }}
                        className="pagination-sm pull-right"
                        onPageChanged={(newPage) => this.getVisibleItems(newPage)}
                    />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                }
            </Loader>
        </div>)

    }
}


export default ActiveTestDrivesContainer;