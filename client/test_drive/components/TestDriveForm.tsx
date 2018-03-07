import * as React from 'react';
import ui from 'redux-ui';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { DateRange, Calendar } from 'react-date-range';
import { TestDrive, IState } from '../model';
import Service from '../../common/services/services';
import * as $ from 'jquery';
import { validateControl, required, validateForm } from '../../common/components/Validations';
import { updateDate } from '../index';
import { ToastContainer, toast } from 'react-toastify';
import { css, active } from 'glamor';
import { Messages, ColumnsValues} from '../../common/services/constants';
import Popup from 'react-popup';
import { Services } from '../../common/services/data_service';
import * as moment from '../../js/moment';

interface TestDriveFormProps {
    testDrive: TestDrive,
    saveTestDrive: (testDrive: TestDrive, formID: string) => any;
    submitTestDrive: (testDrive: TestDrive) => any;
    onChange: (event: any, testDrive: TestDrive) => any;
    updateMultiSelect: (value: any, control: string, testDrive: TestDrive) => any;
    updateMaxPoints: () => any;
    updateDates: (dates: any) => any;
    switchTab: (tabName) => any;
    updateUI: (any) => any;
    fieldDescriptions: any;
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
        showStartDatePicker: false,
        showEndDatePicker: false
    }
})
class TestDriveForm extends React.Component<TestDriveFormProps, TestDriveFormState> {
    constructor(props, state) {
        super(props, state);
        this.onChange = this.onChange.bind(this);
        this.selectControlChange = this.selectControlChange.bind(this);
        this.onSwitchTab = this.onSwitchTab.bind(this);
        this.saveValidate = this.saveValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getEndDate = this.getEndDate.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.testDrive);

        if(e.target.id){
            validateControl(e.target.id, e.target.value);
        }
    }

    handleChange(which, payload) {
        var e = {
            target: {
                value: payload.toISOString(),
                name: which
            }
        };
        
        if(which == 'startDate' && this.props.testDrive.endDate && payload > moment(this.props.testDrive.endDate)){
            Popup.alert(Messages.START_GREATOR_ERROR);
        } else{
            this.onChange(e);
        }
    }

    selectControlChange = (value, id, name) => {
        this.props.updateMultiSelect(value, name, this.props.testDrive);
        validateControl(id, value);
        if (name == 'level') {
            this.props.updateMaxPoints();
        }
    }

    testDriveTypes = [
        { value: 1, label: 'Soapbox Derby' },
        { value: 2, label: 'Street Race' },
        { value: 3, label: 'Drag Race' },
    ]
    getRegions(input, callback) {
        const functions = Service.getRegions().then((regions: Array<any>) => {
            input = input.toLowerCase();
            var options = regions.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    getLocations(input, callback) {
        const functions = Service.getLocations().then((locations: Array<any>) => {
            input = input.toLowerCase();
            var options = locations.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    getDevices(input, callback) {
        const functions = Service.getDevices().then((devices: Array<any>) => {
            input = input.toLowerCase();
            var options = devices.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    getOSes(input, callback) {
        const functions = Service.getOSes().then((oses: Array<any>) => {
            input = input.toLowerCase();
            var options = oses.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    onSwitchTab(direction) {
        var isFormValid = validateForm("test-drive-form" + this.props.testDrive.id);
        if (isFormValid) {
            this.props.updateUI({ activeTab: this.props.ui.activeTab + direction });
        } else {
            Popup.alert(Messages.TEST_DRIVE_ERROR);
        }
    }

    saveValidate(testDrive) {
        Services.getTestDrivesByFilter("TestDriveName eq '" + testDrive.title + "'").then((testDriveData: any) => {
            testDriveData && testDriveData.length > 1 ? Popup.alert(Messages.TEST_DRIVE_SAME_NAME_ERROR) :
                this.props.saveTestDrive(testDrive, "test-drive-form" + testDrive.id);
        });
    }

    componentDidMount() {
        document.body.className = "black-bg";
        $(document).mouseup((e) => {
            var startDateContainer = $(".startDate .rdr-Calendar");

            // if the target of the click isn't the container nor a descendant of the container
            if ($("#endDate").is(e.target)) {
                this.props.updateUI({ showEndDatePicker: true });
            }

            if ($("#startDate").is(e.target)) {
                this.props.updateUI({ showStartDatePicker: true });
            }


            // if the target of the click isn't the container nor a descendant of the container
            if (!$("#startDate").is(e.target) && !startDateContainer.is(e.target) && startDateContainer.has(e.target).length === 0) {
                this.props.updateUI({ showStartDatePicker: false });
            }

            var endDateContainer = $(".endDate .rdr-Calendar");


            if (!$("#endDate").is(e.target) && !endDateContainer.is(e.target) && endDateContainer.has(e.target).length === 0) {
                this.props.updateUI({ showEndDatePicker: false });
            }

            /* for car*/
            $(".test_cases a").click(function () {
                $(".car").addClass("middle");

            });

            $(".servay a").click(function () {
                $(".car").removeClass("middle");
                $(".car").addClass("last");

            });
            /*for car ends */
        });
    }

    getEndDate(){
        return moment(this.props.testDrive.startDate).add(1, 'days')
    }

    render() {
        const { testDrive, saveTestDrive, submitTestDrive, updateMultiSelect, ui, updateUI, fieldDescriptions } = this.props;
        const butttonGroup = {
            float: 'right'
        }
        const format = 'dddd, D MMMM YYYY';
        const maxLimit = 100;
        return (
            <form className="registration_form" id={"test-drive-form" + testDrive.id}>
                <div className="col-xs-12 testdrive_creationbox form_box ">
                    <div className="col-md-12 register_input">
                        <div className="group">
                            <input className="inputMaterial"
                                type="text"
                                onChange={this.onChange}
                                name="title"
                                value={testDrive.title || ""}
                                id={"testDrive-title" + testDrive.id}
                                data-validations={[required]}
                                maxLength={maxLimit}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="disc_lable">Test drive title*</label>
                            <span className="help-text">
                                {fieldDescriptions && fieldDescriptions.TestDriveName}
                            </span>
                            <span className="clsRemainingLength">Remaining: {maxLimit - testDrive.title.length}</span>
                        </div>

                    </div>
                    <div className="col-md-12 register_input textarea-custom">
                        <div className="group">
                            <textarea className="inputMaterial"
                                onChange={this.onChange}
                                name="description"
                                value={testDrive.description || ""}
                                id={"testDrive-description" + testDrive.id}
                                data-validations={[required]}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="disc_lable">Description*</label>
                            <span className="help-text">
                                {fieldDescriptions && fieldDescriptions.EliteDescription}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6 register_input">
                        <div className="group">
                            <div className="form-group">
                                <input className="form-control inputMaterial date_box"
                                    id="startDate"
                                    name="startDate"
                                    placeholder="Start Date"
                                    type="text"
                                    value={Service.formatDate(testDrive.startDate) || ''}
                                    // onFocus={() => { updateUI({ showStartDatePicker: true }) }}
                                    readOnly
                                    
                                />
                                <label className="disc_lable">Start date*</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions.TestDriveStartDate}
                                </span>
                            </div>
                            <div className={"startDate " + (ui.showStartDatePicker ? "show-tab" : "hide-tab")}>
                                <Calendar
                                    minDate={now => { return now.add(0, 'days') }}
                                    // date={now => { return now.add(0, 'days') }}
                                    onInit={this.handleChange.bind(this, 'startDate')}
                                    onChange={this.handleChange.bind(this, 'startDate')}
                                    onFocus={() => { updateUI({ showDatePicker: true }) }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 register_input">
                        <div className="form-group">
                            <input className="form-control inputMaterial date_box"
                                id="endDate"
                                name="endDate"
                                placeholder="End Date"
                                type="text"
                                value={Service.formatDate(testDrive.endDate) || ''}
                                // onFocus={() => { updateUI({ showEndDatePicker: true }) }}
                                readOnly
                            />
                            <label className="disc_lable">End date*</label>
                            <span className="help-text">
                                {fieldDescriptions && fieldDescriptions.TestDriveEndDate}
                            </span>
                        </div>
                        <div className={"endDate " + (ui.showEndDatePicker ? "show-tab" : "hide-tab")}>
                            <Calendar
                                // date={now => { return now.add(1, 'days') }}
                                minDate={this.getEndDate()}
                                onInit={this.handleChange.bind(this, 'endDate')}
                                onChange={this.handleChange.bind(this, 'endDate')}
                                onFocus={() => { updateUI({ showDatePicker: true }) }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 register_input">
                        <div className="form-group">
                            <div data-validations={[required]} className="custom-select" id={"test-drive-type-" + testDrive.id}>
                                <Select
                                    onBlurResetsInput={false}
                                    onSelectResetsInput={false}
                                    options={this.testDriveTypes}
                                    simpleValue
                                    clearable={true}
                                    name="level"
                                    value={testDrive.level}
                                    onChange={(value) => this.selectControlChange(value, "test-drive-type-" + testDrive.id, "level")}
                                    rtl={false}
                                    searchable={false}
                                />
                            </div>
                            <label className="disc_lable">Test drive level*</label>
                            <span className="help-text">
                                {fieldDescriptions && fieldDescriptions.TotalPoints}
                            </span>
                        </div> 
                    </div>
                    <div className="col-md-6 register_input">
                        <div className="form-group">
                            <input className="form-control inputMaterial date_box"
                                id="maxPoints"
                                name="maxPoints"
                                placeholder="Max Points"
                                type="text"
                                value={testDrive.maxPoints.toString() || '0'}
                                readOnly
                                disabled
                            />
                            <label className="disc_lable">Points awarded</label>
                            <span className="help-text">
                                {fieldDescriptions && fieldDescriptions.TotalPoints}
                            </span>
                        </div>
                    </div>

                    
                    <div className="col-md-12 register_input textarea-custom">
                        <textarea className="inputMaterial"
                            name="expectedBusinessValue"
                            id="expectedBusinessValue"
                            onChange={this.onChange}
                            value={testDrive.expectedBusinessValue || ""}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="disc_lable">Expected business value</label>
                        <span className="help-text">
                            {fieldDescriptions && fieldDescriptions.ExpectedBusinessValue}
                        </span>
                    </div>
                    <div className="col-md-12 register_input">
                        <Select.Async multi={true}
                            value={testDrive.region}
                            onChange={(value) => this.selectControlChange(value, "test-drive-region-" + testDrive.id, "region")}
                            valueKey="TermGuid"
                            labelKey="Label"
                            name="region"
                            loadOptions={this.getRegions}
                            type="select-multiple"
                        />
                        <label className="disc_lable">Allowed Regions</label>
                        <span className="help-text">
                            {fieldDescriptions && fieldDescriptions.TestDriveRegion}
                        </span>
                    </div>
                    <div className="col-md-12 register_input">
                        <div className="custom-select" id={"testDrive-location" + testDrive.id}>
                            <Select.Async multi={true}
                                value={testDrive.location}
                                onChange={(value) =>
                                    this.selectControlChange(value, "testDrive-location" + testDrive.id, "location")}
                                valueKey="TermGuid"
                                labelKey="Label"
                                loadOptions={this.getLocations}
                                type="select-multiple"
                                name="location"
                            //data-validations={[required]}
                            />
                        </div>
                        <label className="disc_lable">Eligible drive location</label>

                        <span className="help-text">
                            {fieldDescriptions && fieldDescriptions.TestDriveLocation}
                        </span>
                    </div>
                    <div className="col-md-12 register_input">
                        <div className="custom-select" id={"requiredDevices" + testDrive.id}>
                            <Select.Async multi={true}
                                value={testDrive.requiredDevices}
                                onChange={(value) => this.selectControlChange(value, "requiredDevices" + testDrive.id, "requiredDevices")}
                                valueKey="TermGuid"
                                labelKey="Label"
                                loadOptions={this.getDevices}
                                type="select-multiple"
                                name="requiredDevices"
                            />
                        </div>
                        <label className="disc_lable">Required devices</label>
                        <span className="help-text">
                            {fieldDescriptions && fieldDescriptions.AvailableDevices}
                        </span>
                    </div>
                    <div className="col-md-12 register_input">
                        <div className="custom-select" id={"requiredOs" + testDrive.id}>
                            <Select.Async multi={true}
                                value={testDrive.requiredOs}
                                onChange={(value) => this.selectControlChange(value, "requiredOs" + testDrive.id, "requiredOs")}
                                valueKey="TermGuid"
                                labelKey="Label"
                                loadOptions={this.getOSes}
                                type="select-multiple"
                                name="requiredOs"
                            />
                        </div>
                        <label className="disc_lable">Required OS</label>
                        <span className="help-text">
                            {fieldDescriptions && fieldDescriptions.AvailableOS}
                        </span>
                    </div>
                    <div className="col-md-12 register_input" >
                        <input className="inputMaterial"
                            type="number"
                            onChange={this.onChange}
                            name="maxTestDrivers"
                            value={testDrive.maxTestDrivers || ""}
                            //data-validations={[required]}
                            id={"testDrive-maxTestDrivers" + testDrive.id.toString()}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Max test drivers</label>
                        <span className="help-text">
                            {fieldDescriptions && fieldDescriptions.MaxTestDrivers}
                        </span>
                    </div>
                    <div className="col-md-12 testdrive_actionbox">
                        <div style={butttonGroup}>
                            <div className="button type1 nextBtn btn-lg pull-right animated_button back_btn">
                                <input type="button" value="Next"
                                    onClick={() => this.onSwitchTab(1)} />
                            </div>
                            <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                <input disabled={testDrive.status == ColumnsValues.ACTIVE} type="button" value="Save as a draft"
                                    onClick={() => { this.saveValidate(testDrive) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    }
}

export default TestDriveForm;
