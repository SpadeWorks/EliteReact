import * as React from 'react';
import { Link } from "react-router-dom";

interface PrizesProps {

};
class Prizes extends React.Component<PrizesProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<h1>Prizes.</h1>);
    }
}

export default Prizes;
