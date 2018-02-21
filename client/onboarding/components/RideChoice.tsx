import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
interface RideChoiceProps {
    updateUI: (any) => any;
    ui: any;
};
class RideChoice extends React.Component<RideChoiceProps> {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
        setTimeout(
            function mytext() {
                $('#typewriteText').typewrite({
                    actions: [
                        { type: 'your current ride is a baby stroller. Here is  your chance to upgrade.'}

                        
                    ]
                });
            }, 1500);

        $("input.better_ride").click(function(){
              $(".ride_track img").css({"position":"relative","left":"690px","transition":"all 3s","opacity":"0.1"});

        });
            
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">YOU GOA A</p>
                <p className="next-text">CHOICE, BUD_</p>
                <div id="typewriteText"></div>

                
                  <div className="col-md-12 intro_actionbox testdrive_actionbox">
                    <div className="button type1 pull-right">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Get a better ride" className="better_ride"/>
                    </div>

                    <div className="button type1 pull-right">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Goto Dashboard" className="better_ride"/>
                    </div>
                </div>
            </div>)
    }
}
export default RideChoice;
