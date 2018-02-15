import * as React from 'react';
import * as $ from 'jquery';
import ui from 'redux-ui';
interface TabCarProps {
    switchTab: (key: string) => any;
    updateUI: (any) => any;
    ui: any;
};
class TabCar extends React.Component<TabCarProps>{
    constructor(props, context) {
        super(props, context);
        this.getTabClass = this.getTabClass.bind(this);
    }

    getTabClass(key) {
        this.props.ui.activeTab = this.props.ui.activeTab || 'step-1';
        return this.props.ui.activeTab === key ? " btn-primary" : " btn-default";
    }

    render() {
        const { switchTab } = this.props;
        return (
            <div className="col-md-12">
                <div className="car_box">
                    <div className="car">
                        <img src="/sites/elite/Style%20Library/Elite/images/car.png" className="img-responsive" />
                    </div>
                </div>
                <div className="stepwizard">
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step register_drive">
                            <a onClick={(e:any) => switchTab(e.target.id)} className={"btn tab-border" + this.getTabClass("step-1")} id="step-1">Register a Test Drive</a>
                        </div>
                        <div className="stepwizard-step test_cases">
                            <a onClick={(e:any) => switchTab(e.target.id)} data-type="button"
                                className={"btn tab-border" + this.getTabClass("step-2") } data-disabled="disabled" id="step-2">Test Cases</a>
                        </div>
                        <div className="stepwizard-step servay">
                            <a onClick={(e:any) => switchTab(e.target.id)} data-type="button"
                                className={"btn" + this.getTabClass("step-3") } data-disabled="disabled" id="step-3">Survey Questions</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TabCar;

