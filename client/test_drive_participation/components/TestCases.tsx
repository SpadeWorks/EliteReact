import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCase } from '../../test_drive_participation/model';
import TestCaseForm from '../../test_drive_participation/components/TestCaseForm';
import * as $ from 'jquery';
interface TestCasesProps {
    testCases: TestCase[];
};
class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('#carousel-example-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('next');
                $('#carousel-example-vertical').carousel({
                    interval: 3000
                });
            }
            else {
                $(this).carousel('prev');
            }
        });
    }
    render() {
        const { testCases } = this.props;
        return (<div className="tab-pane active in" id="test_Cases">
            <div className="col-md-12">
                <div id="carousel-example-vertical" className="carousel vertical slide" data-slide data-ride="carousel" data-interval="false ">
                    <div className="carousel-inner " role="listbox ">
                        <div className="item active ">
                            <div className="container ">
                                <div className="col-md-12 ">
                                    {
                                        testCases &&
                                        testCases.length &&
                                        testCases.map((testCase) => {
                                            <TestCaseForm testCase={testCase} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestCases;



