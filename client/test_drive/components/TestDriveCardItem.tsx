import * as React from 'react';
import { Link } from "react-router-dom";

interface TestDriveCardItemProps {

};
class TestDriveCardItem extends React.Component<TestDriveCardItemProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12 TestDriveCardItem">
            <p className="text-right">TestDriveCardItem</p>
        </div>)
    }
}

export default TestDriveCardItem;