import * as React from 'react';
import { Link } from "react-router-dom";

interface NavigationProps {

};
class Navigation extends React.Component<NavigationProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="line_box">
                        </div>
                        <div className="player_box">
                            <div className="col-md-4 testd_box">
                                <p>
                                    <span className="testd_count">76 </span>
                                    <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> +1</p>
                            </div>
                            <div className="col-md-8 player_name">
                                <h2>Jenifer Vetel</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Navigation;
