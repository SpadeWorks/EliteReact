import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import Loader from 'react-loader-advanced';
import Pager from 'react-pager';
import ui from 'redux-ui';
import {
    TestDriveCardItem,
    model,
} from '../../test_drive';


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
    }
})
class ActiveTestDrivesContainer extends React.Component<ActiveTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadActiveTestDrives(0, 100);
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
            visibleItems: this.props.activeTestDrives.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    render() {
        const { activeTestDrives, activeTestDrivesLoading, ui, updateUI } = this.props;

        if (!activeTestDrivesLoading && activeTestDrives && activeTestDrives.length && !ui.visibleItems.length) {
            var currentPage = ui.current;
            if ((ui.visibleItems.length < ui.visibleItems * ui.itemsPerPage) && ui.current != 0) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage);
        }

        return (<div>
            <Loader show={activeTestDrivesLoading || false} message={'Loading...'}>
                {
                    (ui.visibleItems && ui.visibleItems.length) ?
                        ui.visibleItems.map((testDriveObj, index) => {
                            return (<TestDriveCardItem
                                key={index}
                                participants={testDriveObj.participents}
                                testDrive={testDriveObj.testDrive} />)
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
                }
            </Loader>
        </div>)

    }
}


export default ActiveTestDrivesContainer;