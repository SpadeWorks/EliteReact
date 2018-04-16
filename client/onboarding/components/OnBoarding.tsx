import * as $ from 'jquery';
import '../../js/animation.js';
import '../../js/motion.js';
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Services from '../../common/services/services';
import { User } from '../model';
import Welcome from './Welcome';
import CarAnimation from './CarAnimation';
import CurrentRide from './CurrentRide';
import RideChoice from './RideChoice';
import Intro from './Intro';
import ui from 'redux-ui';
import UI from '../../js/custommAnimations';


interface OnBoardingProps {
    dispatch: Dispatch<{}>;
    totalUsers: number;
    currentUser: User;
    introComplete: boolean;
    isUserCreated: boolean;
    updateUI: (any) => any;
<<<<<<< HEAD
    referrerID: string;
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    ui: any;
};

import {
    loadOnBoardingDetails,
    createEliteUserProfile,
    completeIntro,
} from '../../onboarding';


@ui({
    state: {
        nextScreen: '0',
    }
})
class OnBoarding extends React.Component<OnBoardingProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        document.body.className = "starts";
        this.props.dispatch(loadOnBoardingDetails());
        UI.animate();
    }

    createUser() {
        this.props.updateUI({
            nextScreen: 2
        });
<<<<<<< HEAD
        this.props.dispatch(createEliteUserProfile(this.props.currentUser, this.props.referrerID));
=======
        this.props.dispatch(createEliteUserProfile(this.props.currentUser));
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }

    render() {
        const { totalUsers, currentUser, dispatch, introComplete, isUserCreated, ui, updateUI } = this.props;
        // return <h1>Onboarding</h1>
        return (<div id="onboarding">
            <section>
                <div className="col-md-12 top_bar" style={{ height: "50px", background: "black" }}>
                    <div className="logo">
<<<<<<< HEAD
                        <img src="/Style%20Library/Elite/images/logo.png" alt="Equnixlogo" />
=======
                        <img src="/sites/elite/Style%20Library/Elite/images/logo.png" alt="Equnixlogo" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                    </div>
                </div>
            </section>
            <section className="wrapper-elite">
                <div className="container">
                    <div id="ui">
                        <div className="ui-hud">
                            <div className="ui-border-v2 t">
                                <svg viewBox="0 0 620 30">
                                    {/* <use xlink: href="#ui-border-v2"></use> */}
                                </svg>
                                <div className="batt"></div>
                            </div>
                            <div className="border t"></div>
                            <div className="border b"></div>
                            <div className="cross">
                                <div className="border-x f"></div>
                                <div className="border-x l"></div>
                                <div className="border-horz"></div>
                                <div className="border-vert">
                                    <div className="dot t">
                                        <div className="x-hair">
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                    <div className="dot b">
                                        <div className="x-hair">
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-v l">
                                <div className="cap"></div>
                                <div className="cap"></div>
                                <div className="batt"></div>
                            </div>
                            <div className="border-v r">
                                <div className="cap"></div>
                                <div className="cap"></div>
                                <div className="batt"></div>
                            </div>
                            <div className="circles l">
                                <div className="v-center">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="circles r">
                                <div className="v-center">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div >

                    <div id="header">
                        <div className="hud-box">
                            {ui.nextScreen == 1 && <div>
                                <div className="red_box red-box-container">
                                    <svg className="equilizer" viewBox="0 0 296 128">
                                        <g>
                                            <title>Audio Equilizer</title>
                                            <rect className="bar" transform="translate(0,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(130,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(13,0)" y="15"></rect>

                                            <rect className="bar" transform="translate(52,0)" y="15"></rect>

                                            <rect className="bar" transform="translate(117,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(26,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(91,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(104,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(65,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(39,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(78,0)" y="15"></rect>
<<<<<<< HEAD


                                            <rect className="bar" transform="translate(0,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(130,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(13,0)" y="15"></rect>

                                            <rect className="bar" transform="translate(52,0)" y="15"></rect>

                                            <rect className="bar" transform="translate(117,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(26,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(91,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(104,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(65,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(39,0)" y="15"></rect>
                                            <rect className="bar" transform="translate(78,0)" y="15"></rect>
                                            
                                        </g>
                                    </svg>
                                </div>
                                <div className="count_box count-box-container activeuser_box" >
=======
                                        </g>
                                    </svg>
                                </div>
                                <div className="count_box count-box-container" >
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    <p>
                                        <span className="counter">{totalUsers}</span>
                                        <span className="white">ACTIVE </span>
                                        <span className="red">USERS</span>
                                    </p>
                                </div>
                            </div>

                            }
                            {ui.nextScreen == 2 ?
                                <div className="red_box red-box-container">
                                    <div className="outer_ride">
<<<<<<< HEAD
                                        <img src="/Style%20Library/Elite/images/loader2.png" />
                                        <div className="ride_ring">
                                            <img src="/Style%20Library/Elite/images/loader1.png" />
=======
                                        <img src="/sites/elite/Style%20Library/Elite/images/loader2.png" />
                                        <div className="ride_ring">
                                            <img src="/sites/elite/Style%20Library/Elite/images/loader1.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            <div className="count_box current_ridename">

                                                <p> <span className="white">YOUR CURRENT</span> <span className="red">RIDE</span></p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="ride_image">
<<<<<<< HEAD
                                        <img src="/Style%20Library/Elite/images/shoppingcart_Small.png" />
=======
                                        <img src="/sites/elite/Style%20Library/Elite/images/stroller-2.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    </div>


                                    <div id="typewriteText2" style={{ animationDelay: "10s" }}></div>


                                </div> : ''
                            }

                            {ui.nextScreen == 3 ?
                                <div className="red_box red-box-container">
                                    <div className="outer_ride">
<<<<<<< HEAD
                                        <img src="/Style%20Library/Elite/images/loader2.png" />
                                        <div className="ride_ring">
                                            <img src="/Style%20Library/Elite/images/loader1.png" />
=======
                                        <img src="/sites/elite/Style%20Library/Elite/images/loader2.png" />
                                        <div className="ride_ring">
                                            <img src="/sites/elite/Style%20Library/Elite/images/loader1.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            <div className="count_box current_ridename">

                                                <p> <span className="white">READY PLAYER</span> <span className="red">ONE</span></p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="ride_image">
<<<<<<< HEAD
                                        <img src="/Style%20Library/Elite/images/stroller-2.png" />
=======
                                        <img src="/sites/elite/Style%20Library/Elite/images/stroller-2.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    </div>


                                    <div id="typewriteText2" style={{ animationDelay: "10s" }}></div>


                                </div> : ''
                            }


                            {ui.nextScreen == 4 && <div className="red_box red-box-container">
                                <div className="outer_ride">
<<<<<<< HEAD
                                    <img src="/Style%20Library/Elite/images/loader2.png" />
                                    <div className="ride_ring">
                                        <img src="/Style%20Library/Elite/images/loader1.png" />
=======
                                    <img src="/sites/elite/Style%20Library/Elite/images/loader2.png" />
                                    <div className="ride_ring">
                                        <img src="/sites/elite/Style%20Library/Elite/images/loader1.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                        <div className="count_box current_ridename">

                                            <p> <span className="white">YOUR CURRENT</span> <span className="red">RIDE</span></p>

                                        </div>
                                    </div>
                                </div>
                                <div className="ride_image">
<<<<<<< HEAD
                                    <img src="/Style%20Library/Elite/images/shoppingcart_Small.png" />
=======
                                    <img src="/sites/elite/Style%20Library/Elite/images/shoppingcart_Small.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                </div>



                            </div>

                            }



                            <div className="hud-box-border"></div>
                            <div className="tics t">
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                            </div>
                            <div className="tics b">
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                                <div className="tic"></div>
                            </div>
                            <div className="batts l">
                                <div className="batt"></div>
                                <div className="batt"></div>
                            </div>
                            <div className="batts r">
                                <div className="batt"></div>
                                <div className="batt"></div>
                            </div>
                            <div className="batts t">
                                <div className="batt"></div>
                                <div className="batt"></div>
                            </div>
                            <div className="batts b">
                                <div className="batt"></div>
                                <div className="batt"></div>
                            </div>

                            <div className="cap tl"></div>
                            <div className="cap tr"></div>
                            <div className="cap br"></div>
                            <div className="cap bl"></div>
                            <div className="border l"></div>
                            <div className="border r"></div>

                            {
                                ui.nextScreen == 0 &&
                                <Intro ui={ui} updateUI={updateUI} />
                            }

                            {ui.nextScreen == 1 && <Welcome
                                totalUsers={totalUsers}
                                currentUser={currentUser}
                                isUserCreated={isUserCreated}
                                createEliteUserProfile={() => this.createUser()} />
<<<<<<< HEAD
                            }
                            {/* {
                                ui.nextScreen == 2 &&
                                <RideChoice ui={ui} updateUI={updateUI} />
                            }
                            {
                                ui.nextScreen == 3 &&
                                <CarAnimation ui={ui} updateUI={updateUI} />
                            } */}
                            {
                                ui.nextScreen == 2 &&
=======
                            }
                            {
                                ui.nextScreen == 2 &&
                                <RideChoice ui={ui} updateUI={updateUI} />
                            }
                            {
                                ui.nextScreen == 3 &&
                                <CarAnimation ui={ui} updateUI={updateUI} />
                            }
                            {
                                ui.nextScreen == 4 &&
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                <CurrentRide ui={ui} updateUI={updateUI} />
                            }

                        </div >
                        <a className="ui-button small" href="#">
                            <div className="frame"></div>
                            {/* <svg className="ui-arrow" viewBox="0 0 18 9">
                                        <use xlink: href="#ui-arrow"></use>
                                    </svg> */}
                        </a>
                    </div>
                    {/* <svg className='components'>
                        <defs>
                            <g id="ui-text">
                                <path d="M767,453h-1v-1h4v1h-3Zm1-22h1v1h-1v-1Zm-7,0h5v1h-5v-1Zm-9,0h4v1h-4v-1Zm-7,0h5v1h-5v-1Zm-4,0h2v1h-2v-1Zm-3,0h2v1h-2v-1Zm-2,0h1v1h-1v-1Zm17,3H735v-1h18v1Zm-20-3h2v1h-2v-1Zm-15,0h14v1H718v-1Zm16,3H715v-1h19v1Zm-37-3h18v1H697v-1Zm17,3H694v-1h20v1Zm-29-1h7v1h-7v-1Zm-4-2h10v1H681v-1Zm-12,0h9v1h-9v-1Zm15,3H669v-1h15v1Zm0,2H669v-1h15v1Zm-4,2H669v-1h11v1Zm-9,2h-2v-1h2v1Zm5-1v1h-4v-1h4Zm2,3h-9v-1h9v1Zm-7,2h-2v-1h2v1Zm0,2h-2v-1h2v1Zm4,2h-6v-1h6v1Zm-2,2h-4v-1h4v1Zm3,2h-7v-1h7v1Zm23,2H669v-1h30v1Zm-28,2h-2v-1h2v1Zm3-1v1h-2v-1h2Zm4,0v1h-3v-1h3Zm5,0v1h-4v-1h4Zm10,0v1h-8v-1h8Zm4,0v1h-3v-1h3Zm20,3H669v-1h48v1Zm-32,2H669v-1h16v1Zm-13,2h-3v-1h3v1Zm5-1v1h-4v-1h4Zm5,0v1h-2v-1h2Zm4,1v-1h4v1h-4Zm0-3h9v1h-9v-1Zm12,0v1h-1v-1h1Zm3,0v1h-1v-1h1Zm4,0v1h-2v-1h2Zm4,0v1h-3v-1h3Zm0,5H669v-1h40v1Zm-34,2h-6v-1h6v1Zm-5,32h-1v-1h1v1Zm45-18H671v-1h44v1Zm-38,18h-5v-1h5v1Zm9,0h-4v-1h4v1Zm7,0h-5v-1h5v1Zm4,0h-2v-1h2v1Zm3,0h-2v-1h2v1Zm2,0h-1v-1h1v1Zm-10-13v1h-2v-1h2Zm-7,10h18v1H685v-1Zm20,3h-2v-1h2v1Zm15,0H706v-1h14v1Zm-16-3h19v1H704v-1Zm37,3H723v-1h18v1Zm-17-3h20v1H724v-1Zm29,1h-7v-1h7v1Zm4,2H747v-1h10v1Zm12-2H754v-1h15v1Zm0-2H754v-1h15v1Zm0-2H758v-1h11v1Zm0-2h-2v-1h2v1Zm-7,0v-1h4v1h-4Zm7-2h-9v-1h9v1Zm0-2h-2v-1h2v1Zm0-2h-2v-1h2v1Zm0-2h-6v-1h6v1Zm0-2h-4v-1h4v1Zm0-2h-7v-1h7v1Zm0-2H739v-1h30v1Zm0-2h-2v-1h2v1Zm-5,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm-5,0v-1h4v1h-4Zm-10,0v-1h8v1h-8Zm-4,0v-1h3v1h-3Zm28-2H721v-1h48v1Zm0-2H753v-1h16v1Zm0-2h-3v-1h3v1Zm-8,0v-1h4v1h-4Zm-5,0v-1h2v1h-2Zm-4-1v1h-4v-1h4Zm0,3h-9v-1h9v1Zm-12,0v-1h1v1h-1Zm-3,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm40-4H729v-1h40v1Zm0-2h-6v-1h6v1Zm-25-20H731v-1h13v1Zm-12,2h-2v-1h2v1Zm-1-10h-2v-1h2v1Zm-2,2h-2v-1h2v1Zm0,2H716v-1h13v1Zm-6-2v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm10-2H715v-1h12v1Zm-11,2H701v-1h15v1Zm-4-2H696v-1h16v1Zm-23,11h3v1h-3v-1Zm1-6h3v1h-3v-1Zm3,3h-3v-1h3v1Zm5,11h4v1h-4v-1Zm3-11h-6v-1h6v1Zm-3-2h-4v-1h4v1Zm3-2h-3v-1h3v1Zm0,1h4v1h-4v-1Zm2-2h7v1h-7v-1Zm7,3h-3v-1h3v1Zm-7,1h10v1H703v-1Zm0,2h8v1h-8v-1Zm0,10h7v1h-7v-1Zm3-8h13v1H706v-1Zm5,8h6v1h-6v-1Zm15-9v-1h2v1h-2Zm-5,0v-1h2v1h-2Zm-2,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm14-2H715v-1h14v1Zm-15,2h-2v-1h2v1Zm-1-7h2v1h-2v-1Zm8,3h-7v-1h7v1Zm-4,10h15v1H717v-1Zm6,4h-5v-1h5v1Zm-2,1v1h-3v-1h3Zm2,0h6v1h-6v-1Zm10,3H715v-1h18v1Zm-17,4h-2v-1h2v1Zm6,1h2v1h-2v-1Zm33-5h-3v-1h3v1Zm-20,0v-1h15v1H735Zm-4-3h23v1H731v-1Zm27,2v1h-2v-1h2Zm-41,4h45v1H717v-1Zm10,2h1v1h-1v-1Zm-2,4h2v1h-2v-1Zm-5,2v1h-3v-1h3Zm-5,2h5v1h-5v-1Zm2,11h-2v-1h2v1Zm-8,7h2v1h-2v-1Zm0-2h13v1H709v-1Zm6,2v1h-2v-1h2Zm3,0v1h-2v-1h2Zm3,0v1h-2v-1h2Zm-10,2h12v1H711v-1Zm11-2h15v1H722v-1Zm4,2h16v1H726v-1Zm15-4h12v1H741v-1Zm7,4h4v1h-4v-1Zm2-2h7v1h-7v-1Zm10-1h-3v-1h3v1Zm-6-2v-1h5v1h-5Zm-1,0h-4v-1h4v1Zm-3-3h10v1H750v-1Zm12-3h-2v-1h2v1Zm-9-1h2v1h-2v-1Zm3,0h2v1h-2v-1Zm-7,3v-1h8v1h-8Zm-31-1h1v1h-1v-1Zm8,1h-2v-1h2v1Zm-9,3h7v1h-7v-1Zm6,2h2v1h-2v-1Zm4-5v-1h8v1h-8Zm-2,1h10v1H725v-1Zm3,2h3v1h-3v-1Zm0,2h7v1h-7v-1Zm5-2h4v1h-4v-1Zm4-2h6v1h-6v-1Zm0,4h3v1h-3v-1Zm3-2h4v1h-4v-1Zm0-6h4v1h-4v-1Zm0,3h-4v-1h12v1h-8Zm5,1h3v1h-3v-1Zm1-4h3v1h-3v-1Zm-1,6h3v1h-3v-1Zm-24-3v-1h2v1h-2Zm-2-3h13v1H719v-1Zm8-8v1h-6v-1h6Zm8,0v1h-7v-1h7Zm5,1h-4v-1h4v1Zm22,6H719v-1h43v1Zm4,6h-5v-1h5v1Zm-8-3h6v1h-6v-1Zm-15,11v-1h4v1h-4Zm-2-3h7v1h-7v-1Zm-32,3h-2v-1h2v1Zm-2-8H694v-1h13v1Zm1-2h-2v-1h2v1Zm4-1v1h-2v-1h2Zm11,3H709v-1h14v1Zm-8-14h-6v-1h6v1Zm-10-3h18v1H705v-1Zm-2,1H688v-1h15v1Zm-23,0v-1h5v1h-5Zm41-4H676v-1h45v1Zm-10-2h-1v-1h1v1Zm2-4h-2v-1h2v1Zm-15-12h-4v-1h4v1Zm-8-2v-1h12v1H690Zm7-6H685v-1h12v1Zm-7-4h-4v-1h4v1Zm-2,2h-7v-1h7v1Zm-10,1h3v1h-3v-1Zm6,2v1h-5v-1h5Zm1,0h4v1h-4v-1Zm-5,6h2v1h-2v-1Zm5,1h-2v-1h2v1Zm-4-3h8v1h-8v-1Zm7-1H678v-1h10v1Zm-12,4v-1h2v1h-2Zm-4-5h5v1h-5v-1Zm8,3h-6v-1h6v1Zm15-11v1h-4v-1h4Zm2,3h-7v-1h7v1Zm51,5v1h-2v-1h2Zm16,10H736v-1h28v1Zm5,45h-9v-1h9v1Z"
                                    transform="translate(-669 -431)" />
                            </g>
                            <g id="ui-arrow">
                                <path d="M720,745v-9h8l1,1Zm-9-8,1-1h8v9Z" transform="translate(-711 -736)" />
                            </g>
                            <g id="text-the-martian">
                                <path d="M633.691,4615.69V4549.7h23.5v-4h-51v4h23.5v65.99h4Zm59-32.99h42.5v32.99h4V4545.7h-4v33h-42.5v-33h-4v69.99h4V4582.7Zm86.5-37v69.99h48.5v-4h-44.5V4582.7h34.5v-4h-34.5v-29h43.5v-4h-47.5Zm-466.5,171.49,26-43.49v61.99h4V4665.7h-4l-27.5,45.99-27.5-45.99h-4v69.99h4V4673.7l26,43.49h3Zm77-7,15-36.99,15,36.99h-30Zm32,4,8.5,21.5h4.5l-28.5-69.99h-3l-28.5,69.99h4.5l8.5-21.5h34Zm93.5,21.5h4.5l-15.5-26.99,12-11v-21l-12-11h-37.5v69.99h4V4708.7h29Zm-3-57.49v18l-9.5,8.5h-32v-35h32Zm61.5,57.49V4669.7h23.5v-4h-51v4h23.5v65.99h4Zm79,0v-4h-12V4669.7h12v-4h-28v4h12v61.99h-12v4h28Zm43-25.5,15-36.99,15,36.99h-30Zm32,4,8.5,21.5h4.5l-28.5-69.99h-3l-28.5,69.99h4.5l8.5-21.5h34Zm91,13.5-42.5-61.99h-3.5v69.99h4V4673.7l42.5,61.99h3.5V4665.7h-4v61.99Z"
                                    transform="translate(-279.688 -4545.69)" />
                            </g>
                            <g id="text-x-men-apocalypse">
                                <path d="M532.188,4966.7l21.5,32.99h5l-24-36.49,22.5-33.5h-5l-20,30-20-30h-5l22.5,33.5-24,36.49h5Zm50.5,0h35v-4h-35v4Zm103,14.49,26-43.49v61.99h4V4929.7h-4l-27.5,45.99-27.5-45.99h-4v69.99h4V4937.7l26,43.49h3Zm70-51.49v69.99h48.5v-4h-44.5V4966.7h34.5v-4h-34.5v-29h43.5v-4h-47.5Zm129.5,61.99-42.5-61.99h-3.5v69.99h4V4937.7l42.5,61.99h3.5V4929.7h-4v61.99Zm-364.5,102.5,15-36.99,15,36.99h-30Zm32,4,8.5,21.5h4.5l-28.5-69.99h-3l-28.5,69.99h4.5l8.5-21.5h34Zm83-3.5,12-10.99v-23l-12-11h-38v69.99h4v-25h34Zm8-32.49v20l-9.5,8.5h-32.5v-37h32.5Zm54-9.5h24l10.5,9.5v44.99l-10.5,9.5h-24l-10.5-9.5V5062.2Zm-1.5-4-13,12v47.99l13,12h27l13-12V5060.7l-13-12h-27Zm125,66.99h-33.5l-10.5-9.5V5063.2l10.5-9.5h33.5v-4h-35l-13,12v45.99l13,12h35v-4Zm42-21.5,15-36.99,15,36.99h-30Zm32,4,8.5,21.5h4.5l-28.5-69.99h-3l-28.5,69.99h4.5l8.5-21.5h34Zm45-48.49v69.99h44v-4h-40V5049.7h-4Zm88,43.5,27-43.5h-4.5l-24.5,39.5-24.5-39.5h-4.5l27,43.5v26.49h4V5093.2Zm95,1.49,12-10.99v-23l-12-11h-38v69.99h4v-25h34Zm8-32.49v20l-9.5,8.5h-32.5v-37h32.5Zm50,24h24.5l9.5,8.49v12.5l-9.5,8.5h-35.5v4h37l12-11V5093.2l-12-11h-24.5l-9.5-8.5v-11.5l9.5-8.5h33.5v-4h-35l-12,11v14.5Zm73.99-36.5v69.99h48.5v-4h-44.5V5086.7h34.5v-4h-34.5v-29h43.5v-4h-47.5Z"
                                    transform="translate(-505.688 -4929.69)" />
                            </g>
                            <g id='text-avatar'>
                                <path d="M629.017,4300.39l15-37,15,37h-30Zm32,4,8.5,21.5h4.5l-28.5-70h-3l-28.5,70h4.5l8.5-21.5h34Zm62.5,21.5,26.5-70h-4l-25,66-25-66h-4l26.5,70h5Zm60.5-25.5,15-37,15,37h-30Zm32,4,8.5,21.5h4.5l-28.5-70h-3l-28.5,70h4.5l8.5-21.5h34Zm58,21.5v-66h23.5v-4h-51v4h23.5v66h4Zm58-25.5,15-37,15,37h-30Zm32,4,8.5,21.5h4.5l-28.5-70h-3l-28.5,70h4.5l8.5-21.5h34Zm93.494,21.5h4.5l-15.49-27,11.99-11v-21l-11.99-11h-37.5v70h4v-27h29Zm-2.99-57.5v18l-9.5,8.5h-32v-35h32Z"
                                    transform="translate(-614.031 -4255.91)" />
                            </g>
                            <g id="ui-compass-box">
                                <path d="M588.266,936.082l-0.707-.707L605.237,917.7,587.559,900.02l0.707-.707L606.651,917.7Zm-110.308,19.8a54,54,0,1,1,76.367,0A54,54,0,0,1,477.958,955.881Zm75.963-75.962a53.428,53.428,0,1,0,0,75.558A53.428,53.428,0,0,0,553.921,879.919ZM516.142,828.6L498.464,846.28l-0.707-.707,18.384-18.385,17.678,17.678-0.707.707ZM444.017,934.668l-0.707.707L425.632,917.7,443.31,900.02l0.707,0.707L427.046,917.7Zm72.124,72.122,16.971-16.968,0.707,0.708-17.677,17.68-18.385-18.388,0.707-.707Z"
                                    transform="translate(-425.625 -827.188)" />
                            </g>
                            <g id="ui-compass-middle">
                                <path d="M571.056,935.1l-1.184-.287,2.262-9.33,1.185,0.287Zm-13.579-57.328,0.958-.754,5.936,7.544-0.958.754ZM515.72,961.519a44.82,44.82,0,1,1,44.82-44.82A44.82,44.82,0,0,1,515.72,961.519Zm0-88.722a43.9,43.9,0,1,0,43.9,43.9A43.9,43.9,0,0,0,515.72,872.8Zm-4.726-14.124,9.6-.156,0.02,1.22-9.6.155Zm-43.929,25.893L473,877.022l0.958,0.754-5.935,7.544Zm-8.95,41.206,1.185-.287,2.262,9.329-1.185.288Zm38.367,44.686-0.506,1.11-8.738-3.985,0.506-1.11Zm47.718-2.87-8.738,3.984-0.506-1.109,8.738-3.985Z"
                                    transform="translate(-425.625 -827.188)" />
                            </g>
                            <g id="ui-compass-inner">
                                <path d="M563.37,912.24l1.617-.123,0.118,1.556-1.616.123Zm-0.737-5.034,1.593-.294,0.284,1.534-1.594.294Zm-1.276-4.955,1.553-.462,0.445,1.5-1.553.462Zm-1.8-4.775,1.494-.627,0.6,1.438-1.493.627Zm-2.3-4.549,1.418-.783,0.754,1.366-1.418.782Zm-2.781-4.3,1.327-.93,0.895,1.279-1.327.929ZM554,948.045l-1.27-1.007,0.97-1.223,1.269,1.007Zm-2.732-63.38,1.22-1.065,1.026,1.176L552.3,885.84Zm-0.831,67.284-1.156-1.137,1.094-1.112,1.156,1.136Zm-2.778-70.881,1.1-1.189,1.145,1.061-1.1,1.189ZM546.5,955.442l-1.027-1.252,1.205-.99,1.028,1.252Zm-2.819-77.582,0.968-1.3,1.251,0.933-0.968,1.3Zm-2.368,79.289,1.3-.856,0.889,1.353-1.3.857ZM539.4,875.1l0.825-1.394,1.342,0.794-0.825,1.394Zm-2.54,84.546,1.388-.713,0.741,1.441-1.388.713Zm-2.023-86.835,0.672-1.475,1.42,0.648-0.673,1.474ZM496.72,951.447v-1.39a38.206,38.206,0,0,0,18,5.013V921.6a5,5,0,0,1,0-9.8V878.327a38.206,38.206,0,0,0-18,5.013v-1.391a39.641,39.641,0,0,1,38,0v1.391a38.206,38.206,0,0,0-18-5.013V911.8a5,5,0,0,1,0,9.8V955.07a38.206,38.206,0,0,0,18-5.013v1.39A39.627,39.627,0,0,1,496.72,951.447Zm22.5-34.748a3.5,3.5,0,1,0-3.5,3.5A3.5,3.5,0,0,0,519.22,916.7Zm10.829-45.672,0.509-1.537,1.481,0.491-0.51,1.537Zm-4.954-1.264,0.341-1.583,1.525,0.329-0.342,1.583Zm-5.049-.723,0.17-1.611,1.551,0.163L521.6,869.2Zm-5.106-1.795,1.559-.025,0.027,1.619-1.56.026Zm-5.268.346,1.551-.164,0.17,1.611-1.552.164Zm-5.192.918L506,868.18l0.341,1.582-1.524.329ZM499.4,869.98l1.48-.49,0.51,1.537-1.481.491Zm-4.887,2.009,1.42-.648,0.672,1.475-1.42.647Zm-0.672,89.1-1.387-.714,0.74-1.44,1.388,0.713ZM489.876,874.5l1.342-.794,0.825,1.393-1.342.794Zm-0.638,84-1.3-.857,0.89-1.353,1.3,0.856Zm-3.7-81.01,1.251-.933,0.968,1.3-1.251.933Zm-0.6,77.948-1.206-.99,1.028-1.252,1.206,0.99Zm-3.412-74.5,1.144-1.06,1.1,1.189-1.145,1.06ZM481,951.95l-1.094-1.113,1.155-1.136,1.095,1.113Zm-3.076-67.175,1.025-1.175,1.22,1.065-1.025,1.175Zm-0.488,63.271-0.97-1.223,1.27-1.007,0.969,1.223Zm-2.7-59.068,0.895-1.278,1.327,0.929-0.9,1.279Zm-2.731,4.532,0.754-1.366,1.418,0.783-0.753,1.365Zm-2.221,4.777,0.6-1.438,1.493,0.627-0.6,1.438Zm-0.146,5.461-1.553-.462,0.446-1.5,1.553,0.463Zm-1.116,4.993-1.594-.294,0.284-1.535,1.593,0.294Zm-0.571,5.057-1.616-.123,0.118-1.556,1.616,0.122Zm-0.038,5.113-1.619.047-0.046-1.56,1.62-.047Zm0.5,5.091-1.606.219-0.211-1.546,1.606-.219Zm1.037,4.986-1.573.389-0.374-1.514,1.573-.389Zm1.572,4.866-1.521.555-0.535-1.465,1.522-.555Zm2.081,4.65-1.453.716-0.69-1.4,1.454-.717Zm2.573,4.42-1.37.866-0.834-1.318,1.369-.867Zm23.6,18.735-0.582,1.512-1.457-.559,0.582-1.513Zm4.878,1.5-0.416,1.565-1.508-.4,0.417-1.565Zm5.006,0.959-0.245,1.6-1.541-.236,0.245-1.6Zm5.1,0.423-0.073,1.618-1.558-.071,0.073-1.618Zm4.544,1.549-1.558.07-0.074-1.617,1.558-.071Zm5.254-.606-1.541.236-0.245-1.6,1.541-.236Zm5.145-1.162-1.507.4-0.417-1.565,1.507-.4Zm5-1.705-1.457.56-0.581-1.513,1.457-.56Zm23.763-20.141-0.835,1.318-1.369-.867,0.834-1.318Zm2.512-4.65-0.69,1.4-1.453-.716,0.69-1.4Zm0.47-5.432,1.521,0.555-0.534,1.465-1.522-.555Zm1.413-4.914,1.572,0.388-0.374,1.515-1.572-.389Zm0.874-5.02,1.606,0.219-0.211,1.546L563.023,924Zm0.338-5.1,1.62,0.047-0.046,1.559-1.62-.047Z"
                                    transform="translate(-425.625 -827.188)" />
                            </g>
                            <g id="ui-circle">
                                <path d="M189.5,724a7.5,7.5,0,1,1,7.5-7.5A7.5,7.5,0,0,1,189.5,724Zm0-13a5.5,5.5,0,1,0,5.5,5.5A5.5,5.5,0,0,0,189.5,711Z" transform="translate(-182 -709)"
                                />
                            </g>
                            <g id="ui-border-v1">
                                <path d="M227.19,171.413l-3.178,1.832v0.185L192.068,191.8A12.237,12.237,0,0,0,187,201.592V540.971a12.237,12.237,0,0,0,5.068,9.794l14.063,8.085v0.029l5.088,2.948c2.681,1.555,4.781,5.6,4.781,9.749V731.655c0,4.153-2.113,8.2-4.811,9.758l-13.81,7.963v0.008l-5.349,3.091a12.243,12.243,0,0,0-5.036,9.785V960.006H186V761.576c0-4.149,2.1-8.2,4.781-9.748l5.088-2.949V748.85l14.063-8.085A12.237,12.237,0,0,0,215,730.97V649.994h0.006V572.259a12.243,12.243,0,0,0-5.036-9.784l-5.349-3.091v-0.008l-13.81-7.963c-2.7-1.555-4.811-5.605-4.811-9.758V475h-1V265h1V200.908c0-4.154,2.114-8.2,4.811-9.758l3.178-1.833v-0.185l31.943-18.367A12.237,12.237,0,0,0,231,160.97V-0.006h1V161.655C232,165.808,229.886,169.858,227.19,171.413Z"
                                    transform="translate(-185)" />
                            </g>
                            <g id="ui-border-v2">
                                <path d="M628.587,25.19l-7.963-13.811h-0.008L617.525,6.03A12.244,12.244,0,0,0,607.74.994H409.994V0h198.43c4.149,0,8.2,2.1,9.748,4.781l2.949,5.089h0.028l8.086,14.062A12.237,12.237,0,0,0,639.03,29h80.976v0.006h77.735a12.243,12.243,0,0,0,9.784-5.037l3.091-5.348h0.008l7.963-13.811C820.142,2.113,824.192,0,828.345,0H1029.99V1H829.029a12.237,12.237,0,0,0-9.794,5.068L811.15,20.131h-0.029l-2.948,5.089C806.618,27.9,802.573,30,798.424,30H638.345C634.192,30,630.142,27.887,628.587,25.19Z"
                                    transform="translate(-410)" />
                            </g>
                            <g id="ui-border-v3">
                                <path d="M1176,751V940h-1V751H956V940h-1V751H736V940h-1V751H545v1H515v-2h825v1H1176Zm-1-82h1v31h-1V669Zm-220,0h1v31h-1V669Zm-220,0h1v31h-1V669Z"
                                    transform="translate(-515 -669)" />
                            </g>
                            <g id="ui-border-v4">
                                <path d="M1291.35,130c-4.16,0-8.21-2.114-9.76-4.81l-1.84-3.178h-0.18L1261.2,90.068A12.23,12.23,0,0,0,1251.41,85H1108V83h30v1h114.09c4.16,0,8.21,2.114,9.76,4.811l1.83,3.178h0.19l18.37,31.943a12.231,12.231,0,0,0,9.79,5.068h430.98v1H1291.35Z"
                                    transform="translate(-1108 -83)" />
                            </g>
                            <g id="logo-mark">
                                <path className="st0" d="M15.1,6.9C-1.2,18.7-4.9,41.5,6.9,57.8c4.4,6.1,10.6,10.7,17.7,13.1l12.6-18.2L15.1,6.9z M64.6,13.3 C57.7,4.9,47.4,0,36.4,0c-2.3,0-4.5,0.2-6.8,0.6l12,45.7L64.6,13.3z M26.5,71.5c6.5,1.8,13.4,1.8,19.9,0L40,58.4L26.5,71.5z M71.8,27.6L43.9,54.7L48.2,71C66.1,64.8,76.4,46,71.8,27.6L71.8,27.6z"
                                />
                            </g>
                            <g id="logo-type">
                                <path d="M125.4,41.47h6.07V20.73h-5A6.79,6.79,0,0,1,120.89,25v4.8c1.29-.13,3.27-0.31,4.5-1.47V41.47Zm10.29,9.62L135,45.61h-12.7V66.35H135l0.68-5.44h-7.34V58.52h5.45V53.44h-5.45V51.09h7.34ZM111.92,25.15a1.82,1.82,0,0,1,2,2,5.19,5.19,0,0,1-1.83,3.26c-1,1-8.09,7.07-8.09,7.07v4h15.7L120.36,36h-6.89s1.51-1.2,3.42-3.08c2.13-2.1,3.08-3.78,3.08-5.77,0-4.67-3.44-6.78-8.06-6.78s-7.6,2.31-8.08,6.56L109.37,28C109.69,26.08,110.55,25.15,111.92,25.15Zm1.63,41.55a11,11,0,0,0,7.84-3l-3.31-4.5A6.13,6.13,0,0,1,113.92,61c-2.82,0-4.45-2.15-4.45-5.13s1.68-5,4.05-5a5.44,5.44,0,0,1,4.05,1.93l3.4-4.62a10.74,10.74,0,0,0-7.31-3,10.61,10.61,0,0,0-10.91,10.82C102.76,62.25,107.26,66.7,113.55,66.7ZM153.7,41.47h6V26.21h5l-0.68-5.47H149.36l-0.68,5.47h5V41.47Zm-12.93-4.73a9.21,9.21,0,0,1-5.59-2.17l-2.41,4.58a12.85,12.85,0,0,0,8,2.67c4.88,0,8-2.68,8-6.5,0-2.56-1-5.16-5.7-6.65-2.69-.84-3.63-1-3.63-2.12,0-.74.47-1.39,2.17-1.39A7.88,7.88,0,0,1,146,26.7l2.39-4.45A12.08,12.08,0,0,0,142,20.38c-5.17,0-8.46,2.8-8.46,6.47,0,2.65,1.42,5.09,5.61,6.38,2.48,0.75,3.72.88,3.72,2.24C142.85,36.21,142.27,36.73,140.78,36.73Zm9.31,18.93-7.29-10h-5.53V66.35h5.92V55.59l7.88,10.76H156V45.61h-5.93v10Zm6,14.83h-7.19l-2.41,4.63-2.41-4.63h-7.19l6,10-6.4,10.71h7l3-5.14,3,5.14h7l-6.4-10.71ZM158,45.61l-0.68,5.48h5V66.35h6V51.09h5l-0.68-5.48H158ZM187.4,57c0,2.59-1,4.18-3.22,4.18S181,59.6,181,57V45.61h-6.34V56.87c0,3.68.82,9.83,9.55,9.83s9.56-6.15,9.56-9.83V45.61H187.4V57Zm37.22-11.4-3.42,7.22-3.42-7.22h-6.64l7,13v7.75h6V58.59l7-13h-6.65ZM117.17,76.1l-0.7-5.61H104V91.23h6.11v-6.8h5.78V78.85h-5.78V76.1h7.08Zm95.26-23.81c0-4.24-2.85-6.68-7.8-6.68h-8.87V66.35H202v-7h1l3.47,7.45,6.13-1.13-3.84-7.16A6.46,6.46,0,0,0,212.43,52.29Zm-8.58,2.31h-2V50.23h2c1.69,0,2.55.73,2.55,2.16C206.4,53.22,206.07,54.6,203.85,54.6ZM128.17,70.14c-6.51,0-10.87,4.54-10.87,10.74s4.29,10.7,10.81,10.7S139,87,139,80.83,134.68,70.14,128.17,70.14Zm0,15.92c-2.53,0-4.32-2.25-4.32-5.23s1.74-5.18,4.27-5.18,4.32,2.25,4.32,5.23S130.7,86.06,128.17,86.06Z"
                                    transform="translate(-20.73 -19.55)" />
                                <path className="cls-1" d="M35.8,26.48a36.45,36.45,0,0,0,9.56,64L58,72.25Zm49.55,6.4A36.37,36.37,0,0,0,57.17,19.55a36.77,36.77,0,0,0-6.77.63l12,45.71ZM47.23,91.06a36.69,36.69,0,0,0,19.9,0L60.76,77.93Zm45.3-43.92L64.61,74.2l4.29,16.3A36.48,36.48,0,0,0,92.53,47.13Z"
                                    transform="translate(-20.73 -19.55)" />
                            </g>
                        </defs>
                    </svg> */}
                </div>
            </section>
        </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    let referrerID = ownProps.match.params.referrerID;
    return {
        totalUsers: state.onBoardingState.OnBoardingDetails.totalUsers,
        currentUser: state.onBoardingState.OnBoardingDetails.currentUser,
        introComplete: state.onBoardingState.introComplete,
        referrerID: referrerID
    }
};

export default connect(mapStateToProps)(OnBoarding);