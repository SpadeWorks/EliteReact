import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import Loader from 'react-loader-advanced';
import {
    TestDriveCardItem,
    model,
} from '../../test_drive';


interface ActiveTestDrivesContainerProps {
    activeTestDrives: model.TestDrive[];
    activeTestDrivesLoading: boolean;
    loadActiveTestDrives: (skip: number, top: number) => any;
};



class ActiveTestDrivesContainer extends React.Component<ActiveTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadActiveTestDrives(0, 100);
    }

    getPagedArray(activeTestDrives: any) {
        var arrays = [];
        var size = 3;
        while (activeTestDrives.length > 0) {
            arrays.push(activeTestDrives.splice(0, size));
        }
        return arrays;
    }

    render() {
        const { activeTestDrives, activeTestDrivesLoading } = this.props;
        return (<div>
            <Loader show={activeTestDrivesLoading || false} message={'Loading...'}>
                {
                    (activeTestDrives && activeTestDrives.length) ?
                        (<div id="activeTestDrivesCarousel" className="carousel slide"
                            data-ride="carousel" data-interval="false">
                            <div className="carousel-inner">
                                {
                                    this.getPagedArray(activeTestDrives).map((array, i) => {
                                        return <div key={i} className={"item " + (i == 0 ? "active" : '')}>
                                            {
                                                array.map((testDriveObj, index) => {
                                                    return (<TestDriveCardItem
                                                        key={index}
                                                        participants={testDriveObj.participents}
                                                        testDrive={testDriveObj.testDrive} />)

                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                            <a className="left carousel-control" href="#activeTestDrivesCarousel" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#activeTestDrivesCarousel" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>) : (!activeTestDrivesLoading && 'There are no active testdrive items.')
                }
            </Loader>
        </div>)
    }
}

export default ActiveTestDrivesContainer;