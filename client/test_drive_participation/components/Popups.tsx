import * as React from 'react';
import { Link } from "react-router-dom";

interface PopupsProps {

}

class Popups extends React.Component<PopupsProps> {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount()
  {
    
      
  }

  render() {
    return (<div className="col-md-12 ">
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-2">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" id="popupSubmitTestDrive" data-target="#SubmitTestDrive">Fizz</button>
          </div>
          {/* <div className="col-md-2">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" id="popupComingThrough" data-target="#ComingThrough">Coming Through</button>
          </div>

          <div className="col-md-2">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" id="popupPartialSubmit" data-target="#PartialSubmit">Missing Out</button>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" id="popupHighFive" data-target="#HighFive">High Five</button>
          </div>

          <div className="col-md-2">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" id="popupHitTheBreaks" data-target="#HitTheBreaks">Hit the breaks</button>
          </div> */}
        </div>
      </div>

      <div id="SubmitTestDrive" className="modal fade " role="dialog">
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

      {/* <div id="ComingThrough" className="modal fade" role="dialog">
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

      <div id="PartialSubmit" className="modal fade" role="dialog">
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

      <div id="HighFive" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content testrive_notification">
            <div className="modal-header">
              <h4 className="modal-title notification_heading">High Five</h4>
            </div>
            <div className="modal-body">
              <p>You have completed
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

      <div id="HitTheBreaks" className="modal fade" role="dialog">
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
      </div> */}
    </div>)
  }
}

export default Popups;

