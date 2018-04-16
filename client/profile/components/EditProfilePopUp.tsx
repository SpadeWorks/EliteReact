import * as React from 'react';
import { Link } from "react-router-dom";
import { EliteProfile } from '../../home/model';
import AvatarCarousel from './AvatarCarousel';
import Select from 'react-select';
import Service from '../../common/services/services';
import ui from 'redux-ui';
import { Dispatch } from 'redux';
import {
    loadAvatars
} from '../';

interface EditProfilePopUpProps {
    eliteProfile: EliteProfile;
    dispatch: Dispatch<{}>;
    saveEliteProfile: (eliteProfile: EliteProfile) => any;
    updateMultiSelect: (value: any, control: string, eliteProfile: EliteProfile) => any;
    fieldDescriptions: any;
    updateUI: (any) => any;
    ui: any;
    avatars: string[];
};

@ui({
    state: {
        devices: [],
        OS: [],
        avatarSelectedID: 0,
        avatarSelectedImage: "",
        avatarSelectedName: "",
        department: ""
    }
})

class EditProfilePopUp extends React.Component<EditProfilePopUpProps> {
    constructor(props, context) {
        super(props, context);
        this.onSave = this.onSave.bind(this);
        this.departmentChange = this.departmentChange.bind(this);
        this.deviceChange = this.deviceChange.bind(this);
        this.osChange = this.osChange.bind(this);
        this.getDepartment = this.getDepartment.bind(this);
        this.getDevices = this.getDevices.bind(this);
        this.getOSes = this.getOSes.bind(this);   
        let self = this.props;     
        if (this.props.ui.department.length == 0 && this.props.eliteProfile.department && this.props.eliteProfile.department.length) {            
            // Service.getDevices().then((devices: Array<any>) => {
            //     if (self.ui.devices == '') {
            //         let selectedDevices = devices.filter(obj => {
            //             return this.props.eliteProfile.availableDevices.filter(device => {
            //                 return device == obj.Label
            //             })
            //         })
            //         this.props.updateUI({ devices: selectedDevices });
            //     }
            // });
            Service.getDepartments().then((departments: Array<any>) => {
                if (self.ui.department == '') {
                    let selectedDepartment = departments.filter(obj => {                        
                            return self.eliteProfile.department == obj.Label                        
                    })
                    this.props.updateUI({ department: selectedDepartment[0] });
                }
            });
        }
        this.props.updateUI({
            OS: this.props.eliteProfile.availableOS,
            devices: this.props.eliteProfile.availableDevices,
            avatarSelectedID: this.props.eliteProfile.avatarID,
            avatarSelectedImage: this.props.eliteProfile.avatarImage,
            avatarSelectedName: this.props.eliteProfile.avatarName,
            department:this.props.eliteProfile.department
        })
    }

    componentDidMount() {
        this.props.updateUI({
            devices: this.props.eliteProfile.availableDevices,
            OS: this.props.eliteProfile.availableOS,
            department:this.props.eliteProfile.department
        })
        this.props.dispatch(loadAvatars());
    }

    getDepartment(input, callback) {
        let classContext = this;
        const functions = Service.getDepartments().then((departments: Array<any>) => {
            input = input.toLowerCase();
            var options = departments.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options,
                complete: options.length <= 6,
            };

            // if (classContext.props.ui.devices == '') {
            //     let selectedDevices = devices.filter(obj => {
            //         return classContext.props.eliteProfile.availableDevices.filter(device => {
            //             return device == obj.Label
            //         })
            //     })
            //     classContext.props.updateUI({devices: selectedDevices});
            // }
            callback(null, data);
        })
    }

    getDevices(input, callback) {
        let classContext = this;
        const functions = Service.getDevices().then((devices: Array<any>) => {
            input = input.toLowerCase();
            var options = devices.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options,
                complete: options.length <= 6,
            };

            // if (classContext.props.ui.devices == '') {
            //     let selectedDevices = devices.filter(obj => {
            //         return classContext.props.eliteProfile.availableDevices.filter(device => {
            //             return device == obj.Label
            //         })
            //     })
            //     classContext.props.updateUI({devices: selectedDevices});
            // }
            callback(null, data);
        })
    }

    getOSes(input, callback) {
        let classContext = this;
        const functions = Service.getOSes().then((oses: Array<any>) => {
            input = input.toLowerCase();
            var options = oses.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options,
                complete: options.length <= 6,
            };

            // if (classContext.props.ui.OS == '') {
            //     let selectedOses = oses.filter(obj => {
            //         return classContext.props.eliteProfile.availableOS.filter(os => {
            //             return os == obj.Label
            //         })
            //     })                
            //     classContext.props.updateUI({OS: selectedOses})
            // }
            callback(null, data);
        })
    }

    departmentChange = (value) => {
        this.props.updateUI({
            department: value
        })
    }

<<<<<<< HEAD
    deviceChange = (value) => {
        this.props.updateUI({
            devices: value
        })
    }

    osChange = (value) => {
        this.props.updateUI({
            OS: value
        })
    }

    onSave() {
        this.props.updateMultiSelect(this.props.ui.OS, "availableOS", this.props.eliteProfile);
        this.props.updateMultiSelect(this.props.ui.devices, "availableDevices", this.props.eliteProfile);
        //this.props.updateMultiSelect(this.props.ui.department, "department", this.props.eliteProfile);
        this.props.eliteProfile.department = this.props.ui.department ? this.props.ui.department.Label : '';
        this.props.updateMultiSelect(this.props.ui.avatarSelectedImage, "avatarImage", this.props.eliteProfile);
        this.props.eliteProfile.avatarID = this.props.ui.avatarSelectedID;
        this.props.eliteProfile.avatarImage = this.props.ui.avatarSelectedImage;
        this.props.eliteProfile.avatarName = this.props.ui.avatarSelectedName;
        this.props.saveEliteProfile(this.props.eliteProfile);
    }

    render() {
        const { eliteProfile, fieldDescriptions, saveEliteProfile, updateUI, ui, avatars } = this.props;
        return (
            <div className="modal-dialog edit_profile">
                {/* <!-- Modal content--> */}
                <div className="modal-content editpro_box">
                    <div className="wrapper">
=======
        render() {
            const { eliteProfile, fieldDescriptions, saveEliteProfile, updateUI, ui, avatars } = this.props;
            return (
                <div className="modal-dialog edit_profile">
                    {/* <!-- Modal content--> */}
                    <div className="modal-content editpro_box">
                        <div className="wrapper">
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="material-icons pull-right">close</i>
                            </button>
                            <h4 className="modal-title">Profile Details</h4>
                        </div>
                        <AvatarCarousel eliteProfile={eliteProfile} avatars={avatars} updateUI={updateUI} ui={ui} />
                        <div className="col-xs-12 form_box">
                            <div className="col-md-12 register_input readonly">
                                <input className="inputMaterial"
                                    id="driverName"
                                    name="driverName"
                                    placeholder="Driver Name"
                                    type="text"
                                    value={eliteProfile.displayName || ''}
                                    readOnly
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Driver Name</label>
                            </div>
                            <div className="col-md-12 register_input readonly">
                                <input className="inputMaterial"
                                    id="userRole"
                                    name="userRole"
                                    placeholder="Role"
                                    type="text"
                                    value={eliteProfile.role || ''}
                                    readOnly
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Role</label>
                            </div>
                            <div className="col-md-6 register_input readonly">
                                <input className="inputMaterial"
                                    id="userLoaction"
                                    name="userLoaction"
                                    placeholder="Location"
                                    type="text"
                                    value={eliteProfile.location || ''}
                                    readOnly
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Location</label>
                            </div>
                            <div className="col-md-6 register_input readonly">
                                <input className="inputMaterial"
                                    id="joinedDate"
                                    name="joinedDate"
                                    placeholder="Joined Date"
                                    type="text"
                                    value={eliteProfile.dateJoined || ''}
                                    readOnly
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Joined Date</label>
                            </div>
                            <div className="col-md-12 register_input readonly">
                                <input className="inputMaterial"
                                    id="userRegion"
                                    name="userRegion"
                                    placeholder="Region"
                                    type="text"
                                    value={eliteProfile.region || ''}
                                    readOnly
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Region</label>
                            </div>
                            <div className="col-md-12 register_input">
                                <h5>Department</h5>
                                <Select.Async multi={false}
                                    value={ui.department}
                                    onChange={this.departmentChange}
                                    valueKey="TermGuid"
                                    labelKey="Label"
                                    loadOptions={this.getDepartment}                                                                       
                                />
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions.department}
                                </span>
                            </div>
                            <div className="col-md-12 register_input">
                                <h5>Devices I own</h5>
                                <Select.Async multi={true}
                                    value={ui.devices}
                                    onChange={this.deviceChange}
                                    valueKey="TermGuid"
                                    labelKey="Label"
                                    loadOptions={this.getDevices}
                                    type="select-multiple"
                                />
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions.availableDevices}
                                </span>
                            </div>
                            <div className="col-md-12 register_input">
                                <h5>Operating system I have</h5>
                                <Select.Async multi={true}
                                    value={ui.OS}
                                    onChange={this.osChange}
                                    valueKey="TermGuid"
                                    labelKey="Label"
                                    loadOptions={this.getOSes}
                                    type="select-multiple"
                                />
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions.availableOS}
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer testdrive_actionbox">
<<<<<<< HEAD
                            <div className="button type1 nextBtn btn-lg pull-right animated_button" >
                                <input type="button" value="All Set"
                                    onClick={() => { this.onSave() }} data-dismiss="modal" />
=======
                          <div className="button type1 nextBtn btn-lg pull-right animated_button" >
                                <input type="button" value="All Set"
                                    onClick={() => { this.onSave() }} data-dismiss="modal"/>
                         </div>



                       



>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                            </div>







                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default EditProfilePopUp;