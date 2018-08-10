import * as React from 'react';
import Popup from '../../common/components/Popups';
import * as $ from 'jquery';
import * as Constants from '../../common/services/constants';

export interface CreteButtonProps {
    show: boolean;
}

export default class CreteButton extends React.Component<CreteButtonProps, any> {

    createTestDriveButton = [{
        name: 'Test drive with registration',
        callBack: function () {
            window.location.hash = '/testdrive/with_registration';
            
        }
    },
    {
        name: 'Test drive without registration',
        callBack: function () {
            window.location.hash = '/testdrive/without_registration';
        }
    }];

    openTestDrivePopUp() {
        $("#popupTestDriveCreation").trigger('click');
    }



    public render() {
        return (

            <div>
                {
                    this.props.show ? <div>
                        <Popup popupId="TestDriveCreation" title={"Let's get started!"}
                            body={Constants.Messages.TEST_DRIVE_OPTION_MESSAGE}
                            buttons={this.createTestDriveButton} />
                        <div className="centralbox_button">
                            <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                <a id="createButtonID" href="javascript:;" onClick={this.openTestDrivePopUp} >
                                    {"Create Test Drive"}</a>
                            </div>
                        </div>
                    </div> : ''
                }
            </div>
        );
    }
}
