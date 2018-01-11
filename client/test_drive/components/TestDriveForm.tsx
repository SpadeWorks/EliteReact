import * as React from 'react';
import { TestDrive, IState } from '../model';
import testDriveService from '../api/mockApi';
import * as $ from 'jquery';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { DateRange, Calendar } from 'react-date-range';
import ui from 'redux-ui';
import {
    FieldGroup,
    Checkbox,
    Radio,
    FormGroup,
    ControlLabel,
    FormControl,
    Button,
    HelpBlock,
    ButtonToolbar,
    Form,
    Glyphicon,
    InputGroup,
    Col,

} from 'react-bootstrap';
import { updateDate } from '../index';

interface TestDriveFormProps {
    testDrive: TestDrive,
    saveTestDrive: (testDrive: TestDrive) => any;
    submitTestDrive: (testDrive: TestDrive) => any;
    onChange: (event: any, testDrive: TestDrive) => any;
    updateMultiSelect: (value: any, testDrive: TestDrive) => any;
    updateDates: (dates: any) => any;
    updateUI: (any) => any;
    ui: any;
}

interface TestDriveFormState {
    testDrive
};

@ui({
    state: {
        focusedInput: 'startDate',
        startDate: null,
        endDate: null,
        rangePicker: null,
        showDatePicker: false
    }
})
class TestDriveForm extends React.Component<TestDriveFormProps, TestDriveFormState> {
    constructor(props, state) {
        super(props, state);
        this.onChange = this.onChange.bind(this);
        this.multiSelectChange = this.multiSelectChange.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.testDrive);
    }

    multiSelectChange = (value) => {
        this.props.updateMultiSelect(value, this.props.testDrive);
    }

    getFunctions(input, callback) {
        const functions = testDriveService.getFunctions().then((functions: Array<any>) => {
            input = input.toLowerCase();
            var options = functions.filter((i: any) => {
                return i.function.substr(0, input.length) === input;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    getLocations(input, callback) {
        const functions = testDriveService.getLocations().then((locations: Array<any>) => {
            input = input.toLowerCase();
            var options = locations.filter((i: any) => {
                return i.location.substr(0, input.length) === input;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    getDevices(input, callback) {
        const functions = testDriveService.getDevices().then((devices: Array<any>) => {
            input = input.toLowerCase();
            var options = devices.filter((i: any) => {
                return i.device.substr(0, input.length) === input;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    getOSes(input, callback) {
        const functions = testDriveService.getOSes().then((oses: Array<any>) => {
            input = input.toLowerCase();
            var options = oses.filter((i: any) => {
                return i.os.substr(0, input.length) === input;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    handleChange(which, payload) {
        this.props.updateDates({
            startDate: payload['startDate'].toISOString(),
            endDate: payload['endDate'].toISOString()
        })
        this.props.updateUI({
            [which]: payload
        });
    }



    render() {
        const { testDrive, saveTestDrive, submitTestDrive, updateMultiSelect, ui, updateUI } = this.props;
        const butttonGroup = {
            float: 'right'
        }
        const format = 'dddd, D MMMM YYYY';
        return (

            <form className="registration_form">
                <div className="col-xs-12 form_box">
                    <div className="col-md-12 register_input">
                        <input className="inputMaterial"
                            type="text"
                            required
                            onChange={this.onChange}
                            name="title"
                            value={testDrive.title || ""}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Test drive title</label>
                    </div>
                    <div className="col-md-12 register_input">
                        <textarea className="inputMaterial"
                            required
                            onChange={this.onChange}
                            name="description"
                            value={testDrive.description || ""}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="disc_lable">Description</label>
                    </div>

                    <div className="col-md-6 register_input">
                        <div className="form-group">
                            <input className="form-control inputMaterial date_box"
                                id="startDate"
                                name="startDate"
                                placeholder="Start Date"
                                type="text"
                                value={testDriveService.formatDate(testDrive.startDate) || ''}
                                onFocus={() => { updateUI({ showDatePicker: true }) }}
                                onBlur={() => { updateUI({ showDatePicker: false }) }}
                                readOnly
                            />
                        </div>
                    </div>


                    <div className="col-md-6 register_input">
                        <div className="form-group">
                            <input className="form-control inputMaterial date_box"
                                id="endDate"
                                name="endDate"
                                placeholder="End Date"
                                type="text"
                                value={testDriveService.formatDate(testDrive.endDate) || ''}
                                onFocus={() => { updateUI({ showDatePicker: true }) }}
                                onBlur={() => { updateUI({ showDatePicker: false }) }}
                                readOnly

                            />
                        </div>
                    </div>
                   {/*className={ui.showDatePicker ? "show-tab" : "hide-tab"}*/}
                    <div >
                        <div className="register_input date-picker" >
                            <DateRange
                                onChange={this.handleChange.bind(this, 'rangePicker')}
                                minDate={testDriveService.formatDate("today")}
                            />
                        </div>
                    </div>


                    <div className="col-md-12 register_input">
                        <textarea className="inputMaterial"
                            name="expectedBusinessValue"
                            onChange={this.onChange}
                            value={testDrive.expectedBusinessValue || ""}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="disc_lable">Expected Business Value</label>
                    </div>
                    <div className="col-md-12">
                        <h5>Allowed Functions:</h5>
                        <Select.Async multi={true}
                            value={testDrive.function}
                            onChange={this.multiSelectChange}
                            valueKey="function"
                            labelKey="name"
                            loadOptions={this.getFunctions}
                            type="select-multiple"
                        />
                        <br></br>
                        <h5>Allowed Locations:</h5>
                        <Select.Async multi={true}
                            value={testDrive.location}
                            onChange={this.multiSelectChange}
                            valueKey="location"
                            labelKey="name"
                            loadOptions={this.getLocations}
                            type="select-multiple"
                        />

                        <br></br>
                        <h5>Required Devices:</h5>
                        <Select.Async multi={true}
                            value={testDrive.requiredDevices}
                            onChange={this.multiSelectChange}
                            valueKey="device"
                            labelKey="name"
                            loadOptions={this.getDevices}
                            type="select-multiple"
                        />

                        <br></br>
                        <h5>Required OS:</h5>
                        <Select.Async multi={true}
                            value={testDrive.requiredOs}
                            onChange={this.multiSelectChange}
                            valueKey="os"
                            labelKey="name"
                            loadOptions={this.getOSes}
                            type="select-multiple"
                        />
                    </div>

                    <br></br>
                    <div className="col-md-12">
                    <ButtonToolbar style={butttonGroup}>
                        <input type="button" value="Next" className="button type1 nextBtn btn-lg pull-right" />
                        <input type="button" value="Save" className="button type1 nextBtn btn-lg pull-right"
                            onClick={() => { saveTestDrive(testDrive) }} />

                    </ButtonToolbar>
                    </div>
                </div>
            </form>
        );
    }
}

export default TestDriveForm;
