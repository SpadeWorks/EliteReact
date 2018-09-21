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
    // $("#app").mouseup(function (e) {
    //   var container = $(".testrive_notification");
    //   var toolbar = $(".rte-toolbar")
    //   if (((!container.is(e.target) && 
    //         container.has(e.target).length === 0) || (!toolbar.is(e.target) && 
    //         toolbar.has(e.target).length === 0) ||  
    //         (e.target.className && e.target.className.indexOf("closingModal") != -1)) 
    //         && $(".modal").is(":visible")) {
    //           $(".close-popup").trigger('click');
    //           $(".close-popup").trigger('click');
    //     $("canvas#confettiCanvas").hide();
    //   }
    // });
  }

  closePopUp(){
    $(".close-popup").trigger('click');
    $(".close-popup").trigger('click');
    $("canvas#confettiCanvas").hide();
  }

  handleCallBack(callBack){
    this.closePopUp();
    callBack();
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
                  <a key = {index} href="javascript:;" className="button button type1" 
                    onClick={()=>{this.handleCallBack(button.callBack)}} >{button.name}</a>
                  : <Link key={index} onClick={this.closePopUp} className="button type1" to={button.link}>{button.name}</Link>)
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