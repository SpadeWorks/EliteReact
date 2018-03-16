import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';

interface PopupProps {
  popupId: string;
  title: string;
  body: string;
  footer?: any;
  buttons?: any[];
}

class Popup extends React.Component<PopupProps> {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    $("#app").mouseup(function (e) {
      var container = $(".testrive_notification");
      var toolbar = $(".rte-toolbar")
      if (((!container.is(e.target) && 
            container.has(e.target).length === 0) || (!toolbar.is(e.target) && 
            toolbar.has(e.target).length === 0) ||  
            (e.target.className && e.target.className.indexOf("closingModal") != -1)) 
            && $(".modal").is(":visible")) {
        $(".close-popup").trigger('click');
        $(".close-popup").trigger('click');
        //$("canvas#confettiCanvas").hide();
      }
    });
  }

  render() {
    const { popupId, title, body, footer, buttons } = this.props;
    return (<div className="col-md-12 ">
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-2">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" id={"popup" + popupId} data-target={"#" + popupId}
              style={{ display: 'none' }}></button>
          </div>
        </div>
      </div>

      <div id={popupId} className="modal fade " role="dialog">
        <div className="modal-dialog hit_breakbox">
          <div className="modal-content testrive_notification">
            <div className="modal-header">
              <h4 className="modal-title notification_heading" dangerouslySetInnerHTML={{ __html: title }}></h4>
              <div className="modal-footer" style={{ display: 'none' }}>
                <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
              </div>
            </div>
            <div className="modal-body" >
              <p dangerouslySetInnerHTML={{ __html: body }}></p>
            </div>
            <div className="modal-buttons">{
              buttons && buttons.length > 0 ? buttons.map((button: any, index) => {
                return (button.callBack ?
                  <a href="javascript:;" className="button type1 closingModal"
                    onClick={() => { console.log("calling call back"); button.callBack() }} >{button.name}</a>
                  : <Link key={index} className="button type1 closingModal" to={button.link}>{button.name}</Link>)
              }) : ''
            }</div>
            <div className="modal-footer" dangerouslySetInnerHTML={{ __html: footer }}>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Popup;

/* <div id="cusstom-popup" className="modal fade " role="dialog">
        <div className="modal-dialog">
          <div className="modal-content testrive_notification">
            <div className="modal-header">
              <h4 className="modal-title notification_heading">Congratrulations !</h4>
              <div className="modal-footer" style={{display: 'none'}}>
                <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
              </div>
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

      <div id="ComingThrough" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content testrive_notification">
            <div className="modal-header">
              <h4 className="modal-title notification_heading">Coming through</h4>
              <div className="modal-footer" style={{display: 'none'}}>
                <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
              </div>
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
              <div className="modal-footer" style={{display: 'none'}}>
                <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
              </div>
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
              <div className="modal-footer" style={{display: 'none'}}>
                <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
              </div>
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
              <h4 className="modal-title notification_heading">{title}</h4>
              <div className="modal-footer" style={{display: 'none'}}>
                <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
              </div>
            </div>
            <div className="modal-body">
              <p> The Modal plugin is a dialog box/popup window that is displayed on top of the current page: The Modal plugin
                  is a dialog box/popup window that is displayed on top of the current page: The Modal plugin is a dialog box/popup
                  window that is displayed on top of the current page:</p>
            </div>
          </div>
        </div>
      </div>
    </div> 
    
    */

