import * as React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import EditProfilePopUp from "./EditProfilePopUp";
import MyProfileLeftContainer from "./MyProfileLeftContainer"
import MyProfileRightContainer from "./MyProfileRightContainer"
import MyProfileMiddleContainer from "./MyProfileMiddleContainer"
import { EliteProfile } from '../../home/model';
import * as $ from 'jquery';
// import '../../js/jssor.slider-27.0.2.min.js';
import ui from 'redux-ui';

declare var $Jease$: any;
declare var $JssorSlideshowRunner$: any;
declare var $JssorArrowNavigator$: any;
declare var $JssorThumbnailNavigator$: any;
declare var $JssorSlider$: any;
declare var $Jssor$: any;
declare var window: any;

import {
    loadEliteProfile,
    loadUserRank,
    loadUserPoints,
    loadCurrentTestDrives,
    updateMultiSelect,
    loadConfigurations,
    saveEliteProfile,
    setEditMode,
    loadCars,
    resetEliteProfile
} from '../';
import Services from '../../common/services/services';
import { Dispatch } from 'redux';

interface MyProfileProps {
    id: number,
    eliteProfile: EliteProfile;
    dispatch: Dispatch<{}>;
    rank: number;
    totalPoints: 0;
    currentTestDrives: 0;
    eliteProfileFields: object;
    configurationLoaded: boolean;
    updateUI: (any) => any;
    ui: any;
    avatars: string[];
    cars: any[];
    totalTestDrives: number;
};

@ui({
    state: {
        carSelectedID: 0,
        carSelectedImage: "",
        carSelectedName: ""
    }
})

class MyProfile extends React.Component<MyProfileProps> {
    constructor(props, context) {
        super(props, context);
    }

    carSelected(car, baseUrl) {
        this.props.updateUI({
            carSelectedID: car.ID,
            carSelectedImage: baseUrl + car.FileRef,
            carSelectedName: car.CarName
        })
        updateMultiSelect(this.props.ui.carSelectedImage, "carImage", this.props.eliteProfile);
        this.props.eliteProfile.carID = car.ID;
        this.props.eliteProfile.carImage = baseUrl + car.FileRef;
        this.props.eliteProfile.carName = car.CarName;
        saveEliteProfile(this.props.eliteProfile)
    }

    componentWillUnmount() {
        this.props.dispatch(resetEliteProfile());
    }

    componentDidMount() {
        document.body.className = "plane_back";
        let user = Services.getUserProfileProperties();
        if (user.eliteProfileID) {
            this.props.dispatch(loadEliteProfile(this.props.id || user.eliteProfileID));
            this.props.dispatch(loadUserRank(user.eliteProfileID));
            this.props.dispatch(loadUserPoints(user.eliteProfileID));
            this.props.dispatch(loadCurrentTestDrives(user.eliteProfileID));
        }
        if (!this.props.configurationLoaded) {
            this.props.dispatch(loadConfigurations());
        }
        this.props.dispatch(loadCars());

    }

    componentDidUpdate() {
        var slider = $(".present_ride");
        if (slider.length) {
            window.jssor_1_slider_init();
        }
    }


    render() {
        const { eliteProfile, rank, totalPoints,
            currentTestDrives, dispatch,
            eliteProfileFields, updateUI, ui,
            totalTestDrives
            , avatars, cars } = this.props;
        let baseUrl = location.protocol + "//" + location.hostname;

        return (eliteProfile && <div className="col-md-12">
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
                                    <img src={eliteProfile.avatarImage} className="img-responsive" />
                                </div>
                                <div className="col-md-10">

                                    <div className="col-md-12">
                                        <div className="col-md-5 pull-left">
                                            <div className="row">
                                                <h2>{eliteProfile.displayName}</h2>
                                            </div>
                                        </div>
                                        {
                                            (!this.props.id && this.props.id != -1) &&
                                            <div className="col-md-1 edit_profile pull-right">
                                                <a data-toggle="modal" onClick={() => dispatch(setEditMode())} data-target="#edit_pro">
                                                    <i className="material-icons">mode_edit</i>
                                                </a>
                                            </div>

                                        }
                                    </div>
                                    {/* Edit profile modal starts here */}
                                    {
                                        (!this.props.id && this.props.id != -1) &&
                                        <div id="edit_pro" className="modal fade" role="dialog">
                                            {eliteProfile.isInEditMode &&
                                                <EditProfilePopUp eliteProfile={eliteProfile}
                                                    dispatch={dispatch}
                                                    updateUI={updateUI}
                                                    ui={ui}
                                                    avatars={avatars}
                                                    saveEliteProfile={(t) => dispatch(saveEliteProfile(t))}
                                                    updateMultiSelect={(value, control, eliteProfile) => dispatch(updateMultiSelect(value, control, eliteProfile))}
                                                    fieldDescriptions={eliteProfileFields}
                                                />}
                                        </div>
                                    }
                                    }
                                    {/* <!-- Edit profile modal starts here--> */}
                                    <MyProfileLeftContainer eliteProfile={eliteProfile} />
                                    <MyProfileRightContainer eliteProfile={eliteProfile} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <MyProfileMiddleContainer eliteProfile={eliteProfile} currentTestDrives={currentTestDrives} />
                    <div className="row car_sliderbox">
                        <div className="row profile_overviewbox">
                            <div className="container">
                                <div className="col-md-12 overview imp_points">
                                    <div className="col-md-4 text-center">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="testd_box">
                                                    <p>
                                                        <span className="testd_count">
                                                            {rank}
                                                        </span>
                                                        <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> of
                                                        {totalTestDrives}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <h4 className="testcase_title">Your current position</h4>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-4 text-center">
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
                                    </div>*/}
                                    <div className="col-md-4 text-center pull-right">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>
                                                    <span className="orange">
                                                        <i>{totalPoints}</i>
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
                            {
                                (!this.props.id && this.props.id != -1) &&

                                <div id="jssor_1" className="car_boxslider jsTop">
                                    <div data-u="loading" className="jssorl-009-spin jsLoading" >
                                        <img />
                                    </div>
                                    <div data-u="slides" className="jsSlides">
                                        {
                                            cars && cars.map((car, index) => {
                                                return (
                                                    <div key={index}>
                                                        {
                                                            (index == 0) ?
                                                                <div>
                                                                    <div data-p="170.00" className="car_pack">
                                                                        <div className="row">
                                                                            <div className="col-md-12 text-center">
                                                                                <h4 className="text-center">Level 5</h4>
                                                                            </div>
                                                                            <div className="col-md-12 text-center">
                                                                                <span className="orange"><i>{car.CarName}</i></span>
                                                                            </div>
                                                                        </div>
                                                                        <img data-u="image" className="car_bigview" src={car.FileRef} />
                                                                        <img data-u="thumb" src={car.FileRef} />
                                                                        <div className="car-selection"><a href="#"></a></div>
                                                                    </div>
                                                                    <div className="col-md-2 col-md-offset-5 jsOffset">
                                                                        {totalPoints < car.PointsRequired ?
                                                                            <p><a href="#" className="locked_ride"><img src="images/empty.png" />Locked Ride</a></p> :
                                                                            totalPoints > car.PointsRequired ?
                                                                                <p><a href="#" className="future_ride"><img src="images/empty.png" />Feature Ride</a></p>
                                                                                : car.CarName == eliteProfile.carName ?
                                                                                    <p><a href="#" className="present_ride"><img src="images/done.png" />current Ride.</a></p> :
                                                                                    <p><a href="javascript:void(0)" onClick={() => this.carSelected(car, baseUrl)} className="present_ride"><img src="images/done.png" />Get This Ride.</a></p>
                                                                        }
                                                                    </div>
                                                                </div> :
                                                                <div>
                                                                    <div data-p="170.00">
                                                                        <div className="car-name"> <h5>{car.CarName}</h5></div>
                                                                        <img data-u="image" className="car_bigview" src={car.FileRef} />
                                                                        <img data-u="thumb" src={car.FileRef} />
                                                                    </div>
                                                                    <div className="col-md-2 col-md-offset-5 jsOffset">
                                                                        {
                                                                            totalPoints < car.PointsRequired ?
                                                                                <p><a href="#" className="locked_ride"><img src="images/empty.png" />Locked Ride</a></p> :
                                                                                totalPoints > car.PointsRequired ? <p><a href="#" className="future_ride"><img src="images/empty.png" />Feature Ride</a></p>
                                                                                    : car.CarName == eliteProfile.carName ? <p><a href="#" className="present_ride"><img src="images/done.png" />current Ride.</a></p> :
                                                                                        <p><a href="javascript:void(0)" onClick={() => this.carSelected(car, baseUrl)} className="present_ride"><img src="images/done.png" />Get This Ride.</a></p>
                                                                        }
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        {/*<div data-p="170.00" className="car_pack">
                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <h4 className="text-center">Level 5</h4>
                                                </div>
                                                <div className="col-md-12 text-center">
                                                    <span className="orange"><i>458 Itala</i></span>
                                                </div>
                                            </div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car1.png" />
                                            <img data-u="thumb" src="/sites/elite/Lists/CarMaster/car1.png" />
                                            <div className="car-selection"><a href="#"></a></div>
                                        </div>
                                        <div data-p="170.00">
                                            <div className="car-name"> <h5>Car 1</h5></div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car2.png" />
                                            <img data-u="thumb" id="present_ride" src="/sites/elite/Lists/CarMaster/car2.png" />
                                        </div>
                                        <div data-p="170.00">
                                            <div className="car-name"> <h5>Car 2</h5></div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car3.png" />
                                            <img data-u="thumb" src="/sites/elite/Lists/CarMaster/car3.png" className="future_ride" />
                                        </div>
                                        <div data-p="170.00">
                                            <div className="car-name"> <h5>Car 2</h5></div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car3.png" />
                                            <img data-u="thumb" src="/sites/elite/Lists/CarMaster/car3.png" className="lock_ride" />
                                        </div>
                                        <div data-p="170.00">
                                            <div className="car-name"> <h5>Car 2</h5></div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car3.png" />
                                            <img data-u="thumb" src="/sites/elite/Lists/CarMaster/car3.png" />
                                        </div>
                                        <div data-p="170.00">
                                            <div className="car-name"> <h5>Car 2</h5></div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car3.png" />
                                            <img data-u="thumb" src="/sites/elite/Lists/CarMaster/car3.png" />
                                        </div>
                                        <div data-p="170.00">
                                            <div className="car-name"> <h5>Car 2</h5></div>
                                            <img data-u="image" className="car_bigview" src="/sites/elite/Lists/CarMaster/car3.png" />
                                            <img data-u="thumb" src="/sites/elite/Lists/CarMaster/car3.png" />
                                    </div>*/}
                                    </div>
                                    <div data-u="thumbnavigator" className="jssort101 jsSort" data-autocenter="1" data-scale-bottom="0.75">
                                        <div data-u="slides">
                                            <div data-u="prototype" className="p jsPrototype" >
                                                <div data-u="thumbnailtemplate" className="t"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-u="arrowleft" className="jssora106 jsArrowLeft" data-scale="0.75">
                                        <svg className="jsViewBox">
                                            <circle className="c" cx="8000" cy="8000" r="6260.9"></circle>
                                            <polyline className="a" points="7930.4,5495.7 5426.1,8000 7930.4,10504.3 "></polyline>
                                            <line className="a" x1="10573.9" y1="8000" x2="5426.1" y2="8000"></line>
                                        </svg>
                                    </div>
                                    <div data-u="arrowright" className="jssora106 jsArrowRight" data-scale="0.75">
                                        <svg className="jsViewBox">
                                            <circle className="c" cx="8000" cy="8000" r="6260.9"></circle>
                                            <polyline className="a" points="8069.6,5495.7 10573.9,8000 8069.6,10504.3 "></polyline>
                                            <line className="a" x1="5426.1" y1="8000" x2="10573.9" y2="8000"></line>
                                        </svg>
                                    </div>
                                </div>
                            }
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

const mapStateToProps = (state, ownProps) => {
    let userId = ownProps.match.params.id;
    return {
        id: userId,
        eliteProfile: state.profileState.eliteProfile,
        totalPoints: state.profileState.userPoints,
        rank: state.profileState.rank,
        totalTestDrives: state.profileState.totalTestDrives,
        currentTestDrives: state.profileState.currentTestDrives,
        avatars: state.profileState.avatars,
        cars: state.profileState.cars
    }
};

export default connect(mapStateToProps)(MyProfile);
