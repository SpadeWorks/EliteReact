import * as React from 'react';
import { Link } from "react-router-dom";

interface FooterProps {

};
class Footer extends React.Component<FooterProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12">
        <div className="row">
          <div className="container">
            <h2>
              <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Skype for Bussiness</h2>
          </div>
          <div className="col-md-12">
            <div className="col-md-2">
              <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#submitTestDrive">Fizz</button>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">comming through</button>
            </div>
    
            <div className="col-md-2">
              <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal3">missing out</button>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal4">HIgh Five</button>
            </div>
    
            <div className="col-md-2">
              <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal5">Hit the breaks</button>
            </div>
          </div>
        </div>

        <div id="submitTestDrive" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content testrive_notification">
              <div className="modal-header">
    
                <h4 className="modal-title notification_heading">Pop the Fizz !</h4>
              </div>
              <div className="modal-body">
                <p>You have successfully submitted the test drive </p>
                <p>You completed
                  <span className="orange">
                    <i>14</i>
                  </span> of 17 test cases and</p>
                <p>answered
                  <span className="orange">
                    <i>8</i>
                  </span> of 12 servay questions.</p>
                <p>You earned
                  <span className="orange">
                    <i>180</i>
                  </span> points</p>
              </div>
            </div>
          </div>
        </div>
    
        <div id="myModal2" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content testrive_notification">
              <div className="modal-header">
    
                <h4 className="modal-title notification_heading">Coming through</h4>
              </div>
              <div className="modal-body">
                <p>You have successfully submitted the test drive </p>
                <p>this testdrive will expire in
                  <span className="orange">
                    <i>14</i>
                  </span> days</p>
                <p>1 of
                  <span className="orange">
                    <i> 5</i>
                  </span> test cases completed</p>
                <p>Complete the testdrive,earn
                  <span className="orange">
                    <i>500</i>
                  </span> points</p>
              </div>
            </div>
          </div>
        </div>
    
        <div id="myModal3" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content testrive_notification">
              <div className="modal-header">
    
                <h4 className="modal-title notification_heading">You're missing out</h4>
              </div>
              <div className="modal-body">
                <p>You have complted
                  <span className="orange">
                    <i>1</i>
                  </span> of 8 test cases.</p>
                <p>If you submit this session now and go to theServay Question,</p>
                <p>You could lose on
                  <span className="orange">
                    <i> 500</i>
                  </span>
                </p>
                <p>Once you moved ahed. You can't come back.</p>
              </div>
            </div>
          </div>
        </div>
    
        <div id="myModal4" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content testrive_notification">
              <div className="modal-header">
                <h4 className="modal-title notification_heading">High Five</h4>
              </div>
              <div className="modal-body">
                <p>You have complted
                  <span className="orange">
                    <i>1</i>
                  </span> of 8 test cases.</p>
                <p>You earned
                  <span className="orange">
                    <i> 500</i>
                  </span> points</p>
                <p>You are now
                  <span className="orange">
                    <i>50th</i>
                  </span> on the leaderboard.</p>
    
                <p>You are
                  <span className="orange">
                    <i>500</i>
                  </span> points away from getting a supercar.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="myModal5" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content testrive_notification">
              <div className="modal-header">
                <h4 className="modal-title notification_heading">Hit the brakes</h4>
              </div>
              <div className="modal-body">
                <p> The Modal plugin is a dialog box/popup window that is displayed on top of the current page: The Modal plugin
                  is a dialog box/popup window that is displayed on top of the current page: The Modal plugin is a dialog box/popup
                  window that is displayed on top of the current page:</p>
              </div>
            </div>
          </div>
        </div>
      </div>)
    }
}

export default Footer;

