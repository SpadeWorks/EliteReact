import * as React from 'react';
import { Link } from "react-router-dom";

interface MyProfileProps {

};
class MyProfile extends React.Component<MyProfileProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12">
            <div className="row">
                <div className="container">

                    <Link to={"/"} >
                        <h2>
                            <span className="glyphicon glyphicon-menu-left" aria-hidden="true">
                            </span> My Profile
                        </h2>
                    </Link>
                </div>
                <div className="col-md-12" style={{ overflow: "auto" }}>
                    <div className="wrapper">
                        <div className="col-md-12 profile_box">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src="images/propic.png" className="img-responsive" />
                                </div>
                                <div className="col-md-10">
                                    <div className="col-md-12">
                                        <div className="col-md-5 pull-left">
                                            <div className="row">
                                                <h2>jennifer Vietel</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-1 edit_profile pull-right">
                                            <a data-toggle="modal" data-target="#edit_pro">
                                                <i className="material-icons">mode_edit</i>
                                            </a>
                                        </div>
                                    </div>
                                    {/* Edit profile modal starts here */}
                                    <div id="edit_pro" className="modal fade" role="dialog">
                                        <div className="modal-dialog edit_profile">
                                            {/* <!-- Modal content--> */}
                                            <div className="modal-content editpro_box">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal">
                                                        <i className="material-icons">close</i>
                                                    </button>
                                                    <h4 className="modal-title">Profile Details</h4>
                                                </div>
                                                <div className="col-md-12 avtar_selection">
                                                    <span className="orange">Select Avtar</span>
                                                </div>
                                                <div className="modal-body">
                                                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                                                        {/* <!-- Indicators --> */}
                                                        <ol className="carousel-indicators">
                                                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                                            <li data-target="#myCarousel" data-slide-to="1"></li>
                                                            <li data-target="#myCarousel" data-slide-to="2"></li>
                                                        </ol>
                                                        {/* <!-- Wrapper for slides --> */}
                                                        <div className="carousel-inner avatar_box">
                                                            <div className="item active">
                                                                <div className="col-md-12">
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar1.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar2.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar3.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar4.png" />
                                                                    </a>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar1.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar2.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar3.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar4.png" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="item">
                                                                <div className="col-md-12">
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar1.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar2.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar3.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar4.png" />
                                                                    </a>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar1.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar2.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar3.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar4.png" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="item">
                                                                <div className="col-md-12">
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar1.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar2.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar3.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar4.png" />
                                                                    </a>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar1.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar2.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar3.png" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src="images/profile/avatar4.png" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <!-- Left and right controls --> */}
                                                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                                            <span className="glyphicon glyphicon-chevron-left"></span>
                                                            <span className="sr-only">Previous</span>
                                                        </a>
                                                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                                            <span className="glyphicon glyphicon-chevron-right"></span>
                                                            <span className="sr-only">Next</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 form_box">
                                                    <div className="col-md-12 register_input">
                                                        <input className="inputMaterial" type="text" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Test drive title</label>
                                                    </div>
                                                    <div className="col-md-12 register_input">
                                                        <select className="inputMaterial">
                                                            <option value="maximum points">Roll</option>
                                                            <option value="maximum points">100</option>
                                                            <option value="maximum points">500</option>
                                                            <option value="maximum points">1000</option>
                                                            <option value="maximum points">1500</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4 register_input">
                                                        <select className="inputMaterial">
                                                            <option value="maximum points">Maximum points</option>
                                                            <option value="maximum points">100</option>
                                                            <option value="maximum points">500</option>
                                                            <option value="maximum points">1000</option>
                                                            <option value="maximum points">1500</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4 register_input">
                                                        <input className="inputMaterial" type="text" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Location</label>
                                                    </div>
                                                    <div className="col-md-4 register_input">
                                                        <input className="inputMaterial" type="text" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Joined Date</label>
                                                    </div>
                                                    <div className="col-md-12 register_input">
                                                        <input className="inputMaterial" type="text" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Region</label>
                                                    </div>
                                                    <div className="col-md-12 register_input">
                                                        <input className="inputMaterial" type="text" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Test drive title</label>
                                                    </div>
                                                    <div className="col-md-12 register_input">
                                                        <select className="inputMaterial">
                                                            <option value="maximum points">Device I own</option>
                                                            <option value="maximum points">100</option>
                                                            <option value="maximum points">500</option>
                                                            <option value="maximum points">1000</option>
                                                            <option value="maximum points">1500</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 register_input">
                                                        <select className="inputMaterial">
                                                            <option value="maximum points">Operating system I have</option>
                                                            <option value="maximum points">100</option>
                                                            <option value="maximum points">500</option>
                                                            <option value="maximum points">1000</option>
                                                            <option value="maximum points">1500</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <div className="col-md-5 col-md-offset-3 popup_buttonbox">

                                                        <button className="button type1">
                                                            All Set
                              </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Edit profile modal starts here--> */}
                                    <div className="col-md-5  profileinfo_box" style={{ borderRight: "solid 1px #3c3c3c", height: "200px" }}>
                                        <div className="row inforow">
                                            <div className="col-md-4">
                                                <span className="orange">Roll:</span>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Test Driver</h5>
                                            </div>
                                        </div>
                                        <div className="row inforow">
                                            <div className="col-md-4">
                                                <span className="orange">region:</span>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Europe & Middle East</h5>
                                            </div>
                                        </div>
                                        <div className="row inforow">
                                            <div className="col-md-4">
                                                <span className="orange">Location:</span>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Sweden</h5>
                                            </div>
                                        </div>
                                        <div className="row inforow">
                                            <div className="col-md-4">
                                                <span className="orange">End Date:</span>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>JAN 15, 2017</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-md-offset-1 device_box">
                                        <div className="row devicelist">
                                            <div className="col-md-3">
                                                <span className="orange">os :</span>
                                            </div>
                                            <div className="col-md-9">
                                                <ul className="select2-selection__rendered">
                                                    <li className="select2-selection__choice" title="iwatch">
                                                        i Pad
                            </li>
                                                    <li className="select2-selection__choice" title="iwatch">
                                                        i Phone
                            </li>
                                                    <li className="select2-selection__choice" title="iwatch">
                                                        pc
                            </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row devicelist">
                                            <div className="col-md-3">
                                                <span className="orange">Devices :</span>
                                            </div>
                                            <div className="col-md-9">
                                                <ul className="select2-selection__rendered">
                                                    <li className="select2-selection__choice" title="iwatch">
                                                        Windows 10
                            </li>
                                                    <li className="select2-selection__choice" title="iwatch">
                                                        iOS
                            </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row profile_overviewbox">
                        <div className="col-md-12 overview">
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>
                                            <span className="orange">
                                                <i>10</i>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h4 className="testcase_title">Current test drives</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <img src="images/current_white.png" />
                                    </div>
                                    <div className="col-md-12">
                                        <h4 className="testcase_title">Currnt ride</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>
                                            <span className="orange">
                                                <i>4</i>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h4 className="testcase_title">Current Level</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>
                                            <span className="orange">
                                                <i>100</i>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h4 className="testcase_title">Completed test drives</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>
                                            <span className="orange">
                                                <i>447</i>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h4 className="testcase_title">Completed test drives</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row car_sliderbox">
                        <div className="row profile_overviewbox">
                            <div className="container">
                                <div className="col-md-12 overview imp_points">
                                    <div className="col-md-4 text-center">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="testd_box">
                                                    <p>
                                                        <span className="testd_count">76 </span>
                                                        <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> of 2000</p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <h4 className="testcase_title">Current test drives</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4>Level 5</h4>
                                            </div>

                                            <div className="col-md-12">
                                                <span className="orange">
                                                    <i>458 Itala</i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center pull-right">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>
                                                    <span className="orange">
                                                        <i>15,530</i>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="col-md-12">
                                                <h4 className="testcase_title">Total Points Earned</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {/* <!-- bootstrap carousel --> */}
                            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="false">
                                {/* <!-- Indicators --> */}
                                <ol className="carousel-indicators">
                                    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                                </ol>
                                {/* <!-- Wrapper for slides --> */}
                                <div className="carousel-inner">
                                    <div className="item active srle">
                                        <img src="images/cars/car1.png" alt="1.jpg" className="img-responsive" />
                                        <div className="carousel-caption">
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src="images/cars/car2.png" alt="2.jpg" className="img-responsive" />
                                        <div className="carousel-caption">
                                        </div>
                                    </div>

                                    <div className="item">
                                        <img src="images/cars/car3.png" alt="3.jpg" className="img-responsive" />
                                        <div className="carousel-caption">

                                        </div>
                                    </div>

                                    <div className="item">
                                        <img src="images/cars/car4.png" alt="4.jpg" className="img-responsive" />
                                        <div className="carousel-caption">

                                        </div>
                                    </div>

                                    <div className="item">
                                        <img src="images/cars/car1.png" alt="2.jpg" className="img-responsive" />
                                        <div className="carousel-caption">
                                            <img src="images/cars/locked-car.png" />
                                        </div>
                                    </div>

                                    <div className="item">
                                        <img src="images/cars/car2.png" alt="3.jpg" className="img-responsive" />
                                        <div className="carousel-caption">
                                            <img src="images/cars/locked-car.png" />
                                        </div>
                                    </div>

                                    <div className="item">
                                        <img src="images/cars/car3.png" alt="4.jpg" className="img-responsive" />
                                        <div className="carousel-caption">
                                            <img src="images/cars/locked-car.png" />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Controls --> */}
                                <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                    <span className="glyphicon glyphicon-chevron-left"></span>
                                </a>
                                <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                    <span className="glyphicon glyphicon-chevron-right"></span>
                                </a>

                                {/* <!-- Thumbnails --> */}
                                <ul className="thumbnails-carousel clearfix">
                                    <li>
                                        <img src="images/cars/car1.png" alt="1_tn.jpg" />
                                    </li>
                                    <li>
                                        <img src="images/cars/car2.png" alt="1_tn.jpg" />
                                    </li>
                                    <li>
                                        <img src="images/cars/car1.png" alt="1_tn.jpg" />
                                    </li>
                                    <li>
                                        <img src="images/cars/car2.png" alt="1_tn.jpg" />
                                        <p className="current_ridecheck">
                                            <img src="images/done.png" /> Your Ride</p>
                                    </li>
                                    <li>
                                        <img src="images/cars/car1.png" alt="1_tn.jpg" />
                                    </li>
                                    <li>
                                        <img src="images/cars/car2.png" alt="1_tn.jpg" />
                                    </li>
                                    <li>
                                        <img src="images/cars/car3.png" alt="1_tn.jpg" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 footer" style={{ height: "50px", background: "#000" }}>
                    <p className="text-right">&copy; 2018 Equinix inc. All rights reserved.</p>
                </div>
            </div>
        </div>)
    }
}

export default MyProfile;
