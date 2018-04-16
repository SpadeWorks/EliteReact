import * as React from 'react';
import Loader from 'react-loader-advanced';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from "react-router-dom";
import Services from '../../common/services/services';

import {
    model,
    loadPrizes
} from '../../home';
interface PrizesProps {
    dispatch: Dispatch<{}>;
    prizes: any[],
    prizesLoading: boolean;
};
class Prizes extends React.Component<PrizesProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        document.body.className = "plane_back";
        this.props.dispatch(loadPrizes());
    }

    render() {
        const { prizesLoading, prizes } = this.props;
        let baseUrl = location.protocol + "//" + location.hostname;
        return (<div>
            <Loader show={prizesLoading} message={'Loading prizes...'}>
                <div className="container header_part">
                    <h2 className="header_prevlink"> <a href="javascript:;" onClick={() => Services.goBack()}>
                        <span className="glyphicon glyphicon-menu-left" aria-hidden="true">
                        </span> Prizes
                    </a>
                    </h2>
                    <h4 className="cancel-btn"><Link to={"/"}>CANCEL</Link></h4>
                </div>
                <div className="wrapper" style={{ height: "900px" }}>
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {
                                prizes && prizes.length > 0 ? prizes.map((prize: any, index) => {
                                    return (<div key={index} className={index == 0 ? "item active" : 'item'}>
                                        <div className="col-md-12">
                                            <div className="col-md-5 prize_model">
                                                <img src={baseUrl + prize.FileRef} className="img-responsive" />
                                            </div>
                                            <div className="col-md-7 prize_description">
                                                <span className="orange">{prize.Title}</span>
                                                <h2>{prize.PrizeName}</h2>
                                                <div className="col-md-6">
                                                    <p>{prize.EliteDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)

                                }) : 'No prizes to show.'
                            }

                        </div>
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <p className="more_prizes">More Prizes</p>
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </Loader>
        </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prizes: state.homeState.prizes,
        prizesLoading: state.homeState.prizesLoading
    }
};

export default connect(mapStateToProps)(Prizes);

