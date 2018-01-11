import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TestDriveItem from './TestDriveItem';
import {
    model
} from '../../test_drive';

interface AppProps {
    testDrives: model.TestDrive[];
    editTestDrive: (t: model.TestDrive) => void;
    deleteTestDrive: (id: number) => any;

};

class TestDrives extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { editTestDrive, deleteTestDrive, testDrives} = this.props
        return <div>
        {
            testDrives.map(testDrive =>{
            return <TestDriveItem 
                key={testDrive.id} 
                testDrive={testDrive} 
                editTestDrive={editTestDrive}
                deleteTestDrive={deleteTestDrive}/>
        })
    }</div>
    }
}

export default TestDrives