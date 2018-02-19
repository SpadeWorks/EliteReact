import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import Loader from 'react-loader-advanced';
import {
    TestDriveCardItem,
    loadUpCommingTestDrives,
    model,
} from '../../test_drive';


interface UpCommingTestDrivesContainerProps {
    upCommingTestDrives: model.TestDrive[];
    upCommingTestDrivesLoading: boolean;
    loadUpCommingTestDrives: (skip: number, top: number) => any;
};



class UpCommingTestDrivesContainer extends React.Component<UpCommingTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadUpCommingTestDrives(0, 100);
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
        const { upCommingTestDrives, upCommingTestDrivesLoading } = this.props;
        return (<div>
            <Loader show={upCommingTestDrivesLoading || false} message={'Loading...'}>
                {
                    (upCommingTestDrives && upCommingTestDrives.length) ?
                        (<div id="upcommingCarousel" className="carousel slide"
                            data-ride="carousel" data-interval="false">
                            <div className="carousel-inner">
                            {
                                    this.getPagedArray(upCommingTestDrives).map((array, i) => {
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
                            <a className="left carousel-control" href="#upcommingCarousel" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#upcommingCarousel" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>) : (!upCommingTestDrivesLoading && 'There are no approved items.')
                }
            </Loader>
        </div>)
    }
}

export default UpCommingTestDrivesContainer;