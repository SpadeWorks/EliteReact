import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import Pager from 'react-pager';
<<<<<<< HEAD
import Services from '../../common/services/services';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
import {
    TestDriveCardItem,
    loadUpCommingTestDrives,
    model,
} from '../../test_drive';
<<<<<<< HEAD
import { Messages } from '../../common/services/constants';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc


interface UpCommingTestDrivesContainerProps {
    upCommingTestDrives: model.TestDrive[];
    upCommingTestDrivesLoading: boolean;
    loadUpCommingTestDrives: (skip: number, top: number) => any;
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
        upCommingTestDrives: [],
        upCommingTestDrivesLoading: false
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }
})
class UpCommingTestDrivesContainer extends React.Component<UpCommingTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
<<<<<<< HEAD
        var self = this;
        self.props.updateUI({
            upCommingTestDrivesLoading: true,
        });
        Services.getUpcomingTestDrives(0, 1000).then(data => {
            self.props.updateUI({
                upCommingTestDrivesLoading: false,
                upCommingTestDrives: data || [],
            });
            this.initialize();
        })
=======
        this.props.loadUpCommingTestDrives(0, 100);
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
<<<<<<< HEAD
            visibleItems: this.props.ui.upCommingTestDrives.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    initialize() {
        const { ui, updateUI } = this.props;
        const {
            upCommingTestDrives,
            upCommingTestDrivesLoading
        } = ui;
=======
            visibleItems: this.props.upCommingTestDrives.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    render() {
        const { upCommingTestDrives, upCommingTestDrivesLoading, ui, updateUI } = this.props;

>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
        if (!upCommingTestDrivesLoading && upCommingTestDrives && upCommingTestDrives.length && !ui.visibleItems.length) {
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
            upCommingTestDrives,
            upCommingTestDrivesLoading
        } = ui;
        this.initialize();

        return (<div>
            {ui.isCreaseTestDriveVisible ? <div className="centralbox_button row">
                <div className="button type1 nextBtn btn-lg pull-right animated_button">
                    <Link to={"/testdrive"} >Create Test Drive</Link>
                </div>
            </div> : ''
                // < div className="centralbox_button row">
                //             <div className="button type1 nextBtn btn-lg pull-right animated_button">
                //         <a href="javascript:;" onClick={() => Services.requestAccess()} >Become Drive Owner</a>
                //     </div>
                // </div>
            }
            <Loader show={upCommingTestDrivesLoading} message={'Loading...'}>
                {
                    (!upCommingTestDrivesLoading && ui.visibleItems && ui.visibleItems.length) ?
                        ui.visibleItems.map((testDriveObj, index) => {
                            return (<TestDriveCardItem
                                key={index}
                                participants={testDriveObj.participants}
                                testDrive={testDriveObj.testDrive}
                                isActive={false} />)
                        }) : (!upCommingTestDrivesLoading && <div className="no-data-message">{Messages.TEST_DRIVE_UPCOMING_MSG}</div>)
                }
                {

                    (!upCommingTestDrivesLoading && ui.visibleItems && ui.visibleItems.length > 0) ?
                        <div className="col-md-12">
                            <Pager
                                total={Math.ceil(upCommingTestDrives.length / ui.itemsPerPage)}
                                current={ui.current}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.getVisibleItems(newPage)}
                            />
                        </div> : ''
                }
            </Loader>
        </div >)
=======

        return (<div>
            <Loader show={upCommingTestDrivesLoading} message={'Loading...'}>
                {
                    (ui.visibleItems && ui.visibleItems.length) ?
                        ui.visibleItems.map((testDriveObj, index) => {
                            return (<TestDriveCardItem
                                key={index}
                                participants={testDriveObj.participents}
                                testDrive={testDriveObj.testDrive} 
                                isActive={false}/>)
                        }) : (!upCommingTestDrivesLoading && 'There are no upcoming items.')
                }
                {
                    ui.visibleItems && ui.visibleItems.length > 0 &&
                    <Pager
                        total={Math.ceil(upCommingTestDrives.length / ui.itemsPerPage)}
                        current={ui.current}
                        visiblePages={ui.visiblePages}
                        titles={{ first: '<', last: '>' }}
                        className="pagination-sm pull-right"
                        onPageChanged={(newPage) => this.getVisibleItems(newPage)}
                    />
                }
            </Loader>
        </div>)
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }
}

export default UpCommingTestDrivesContainer;