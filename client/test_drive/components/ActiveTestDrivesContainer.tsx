import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import Loader from 'react-loader-advanced';
import Pager from 'react-pager';
import ui from 'redux-ui';
import Services from '../../common/services/services';
import {
    TestDriveCardItem,
    model,
} from '../../test_drive';
import { Messages } from '../../common/services/constants';
import CreateButton from './CreateButton';


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
        activeTestDrives: [],
        activeTestDrivesLoading: false
    }
})
class ActiveTestDrivesContainer extends React.Component<ActiveTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
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
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
            visibleItems: this.props.ui.activeTestDrives.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    initialize() {
        const { ui, updateUI } = this.props;
        const {
            activeTestDrivesLoading,
            activeTestDrives
        } = ui;

        if (!activeTestDrivesLoading && activeTestDrives && activeTestDrives.length && !ui.visibleItems.length) {
            var currentPage = ui.current;
            if ((ui.visibleItems.length < ui.visibleItems * ui.itemsPerPage) && ui.current != 0) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage);
        }

    }

    render() {
        const { ui, updateUI } = this.props;
        const {
            activeTestDrivesLoading,
            activeTestDrives
        } = ui;
        this.initialize();

        return (<div>
            <CreateButton show={ui.isCreaseTestDriveVisible} />

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
                                titles={{
                                    first:   '<<',
                                    prev:    '<',
                                    next:    '>',
                                    last:    '>>'
                                }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.getVisibleItems(newPage)}
                            />
                        </div> : ''
                }
            </Loader>
        </div>)

    }
}


export default ActiveTestDrivesContainer;