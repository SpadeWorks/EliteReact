import * as React from 'react';
import * as $ from 'jquery';
interface TabCarProps {
    switchTab: (key: string) => any;
};
class TabCar extends React.Component<TabCarProps>{
    constructor(props, context) {
        super(props, context);
        this.switchTab.bind(this);
    }

    switchTab(e: any){
        //$(".stepwizard").find('a').removeClass("btn-primary btn-default").addClass("btn-default");
        $(".stepwizard").find('a').removeClass("btn-primary").addClass("btn-default");
        $(e.target).addClass("btn-primary");
        this.props.switchTab(e.target.id);
    }
    
    render() {
        const {switchTab} = this.props;
        return (
            <div className="col-md-12">
                <div className="car_box">
                    <div className="car">
                        <img src={""} className="img-responsive" />
                    </div>
                </div>
                <div className="stepwizard">
                    <div className="stepwizard-row setup-panel">
                        <div  className="stepwizard-step register_drive">
                            <a  onClick={(e) => this.switchTab(e)} className="btn btn-default btn-primary tab_border" id="step-1">Register a Test Drive</a>
                        </div>
                        <div className="stepwizard-step test_cases">
                            <a onClick={(e) => this.switchTab(e)} data-type="button" 
                                className="btn btn-default tab_border" data-disabled="disabled" id="step-2">Test Cases</a>
                        </div>
                        <div className="stepwizard-step servay">
                            <a onClick={(e) => this.switchTab(e)} data-type="button" 
                                className="btn btn-default" data-disabled="disabled" id="step-3">Servay Questions</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TabCar;

