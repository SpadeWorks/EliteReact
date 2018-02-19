import * as React from 'react';
import { Link } from "react-router-dom";
import {
    model, 
} from '../../test_drive';

interface MyTestDrivesCompletedItemProps {
    myCompletedTestDrives: model.MyTestDrive[]
    myCompletedTestDrivesLoading: boolean,
    loadMyCompletedTestDrives: (skip:number, top: number) => any;
};
class MyTestDrivesCompletedItem extends React.Component<MyTestDrivesCompletedItemProps> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){
        this.props.loadMyCompletedTestDrives(0, 100);
    }
    render() {
        return (<div className="col-md-12 MyTestDrivesCompletedItem">
            <p className="text-right">MyTestDrivesCompletedItem</p>
        </div>)
    }
}

export default MyTestDrivesCompletedItem;