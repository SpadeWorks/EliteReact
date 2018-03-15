import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import { ReportBug } from '../model';
import { validateControl, required, validateForm } from '../../common/components/Validations';
import { connect } from 'react-redux';
import { Services } from '../../common/services/data_service';
import { updateReportBug } from '../../report_bug'
import { Messages } from '../../common/services/constants';
import Popup from '../../common/components/Popups';
import * as $ from 'jquery';
import Files from 'react-files';
import ui from 'redux-ui';

interface ReportBugHomeProps {
    id: number,
    reportBug: ReportBug;
    dispatch: Dispatch<{}>;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        files: []
    }
})

class ReportBugHome extends React.Component<ReportBugHomeProps> {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.onFilesError = this.onFilesChange.bind(this);
        this.filesRemoveOne = this.filesRemoveOne.bind(this);
    }

    componentDidMount() {
        document.body.className = "black-bg";
    }
    onFilesChange(files) {
        var duplicateFiles = [];
        var oldFiles = this.props.reportBug.files;
        oldFiles && oldFiles.length && oldFiles.map(oldFile => {
            var machedElement = files && files.length && files.filter(newFile => {
                return oldFile.FileName == newFile.name
            });
            machedElement.length && duplicateFiles.push(machedElement[0].name);
        })

        if (duplicateFiles.length) {
            alert("Files with following names are alredy attached:" + '\n' + duplicateFiles.join(', '));
        } else {
            this.props.updateUI({
                files: files
            });
        }
    }

    filesRemoveOne = (removedFile) => {
        var files: any = this.refs.files;
        files.removeFile(removedFile);
        const newFiles = this.props.ui.files.filter((file: any) => {
            return file.id != removedFile.id;
        })
        this.props.updateUI({
            files: newFiles
        });
    }

    onFilesError(error, file) {
    }

    onChange = (e) => {
        this.props.dispatch(updateReportBug(e, this.props.reportBug))
        if (e.target.id) {
            validateControl(e.target.id, e.target.value);
        }
    }

    saveReportBug(reportBug) {
        reportBug.testDriveID = this.props.id;
        reportBug.files = this.props.ui.files;
        var isFormValid = validateForm("reportbug-form" + reportBug.id);
        if (isFormValid) {
            Services.createOrSaveReportBug(reportBug).then(() => {
                $("#popupReportBugSuccess").trigger('click');
            });
        }
    }

    reportBugSuccessButtons = [{
        name: 'Ok',
        link: '#'
    }
    ]

    render() {
        const { reportBug, ui, updateUI } = this.props;
        const maxLimit = 500;
        const butttonGroup = {
            float: 'right'
        }
        return (
            <div className="container header_part">
                <Popup popupId="ReportBugSuccess" title={"Success"}
                    body={Messages.REPORT_BUG_SUCCESS}
                    buttons={this.reportBugSuccessButtons} />
                <h2 className="header_prevlink">
                    <Link to={"/"} >
                        <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Report a bug
                    </Link>
                </h2>
                <div className="col-md-12 testdrive_createbox">
                    <div className="wrapper">
                        <div className={"row setup-content"} id="step-1" >
                            <div className="col-xs-12 form_box tab-container">
                                <form className="registration_form" id={"reportbug-form" + reportBug.id}>
                                    <div className="col-xs-12 testdrive_creationbox form_box ">
                                        <div className="col-md-12 register_input">
                                            <div className="group">
                                                <input className="inputMaterial"
                                                    type="text"
                                                    onChange={this.onChange}
                                                    name="title"
                                                    value={reportBug.title || ""}
                                                    id={"reportbug-title" + reportBug.id}
                                                    data-validations={[required]}
                                                    maxLength={maxLimit}
                                                />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label className="disc_lable">Title*</label>
                                                <span className="clsRemainingLength">Remaining: {maxLimit - reportBug.title.length}</span>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12 register_input textarea-custom">
                                            <div className="group">
                                                <textarea className="inputMaterial"
                                                    onChange={this.onChange}
                                                    name="description"
                                                    value={reportBug.description || ""}
                                                    id={"reportbug-description" + reportBug.id}
                                                    data-validations={[required]}
                                                />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label className="disc_lable">Description*</label>
                                            </div>
                                        </div> */}
                                        <div className="col-md-12 comment_box ">
                                            <Files
                                                ref='files'
                                                className='files-dropzone-list'
                                                onChange={this.onFilesChange}
                                                onError={this.onFilesError}
                                                multiple
                                                maxFiles={10}
                                                maxFileSize={10000000}
                                                minFileSize={0}
                                                clickable
                                            ><i className="material-icons pull-right">attachment</i>
                                            </Files>

                                            <textarea className="inputMaterial form-control"
                                                onChange={(e: any) => this.onChange(e)}
                                                name="description"
                                                value={reportBug.description}
                                                id={"reportbug-description" + reportBug.id}
                                                data-validations={[required]} />

                                            <span className="highlight "></span>
                                            <span className="bar "></span>
                                            <label className="disc_lable ">Description*</label>
                                        </div>
                                        <div className="files" style={{ clear: 'both' }}>
                                            {
                                                (reportBug && reportBug.files && reportBug.files.length) ? <div className='files-list'>
                                                    <ul>{reportBug.files.map((file, index) => {
                                                        return (<li className='files-list-item' key={file.FileName + index}>
                                                            <div className='files-list-item-preview'>
                                                                <img className='files-list-item-preview-image' src={file.ServerRelativeUrl} />
                                                            </div>
                                                            <div className='files-list-item-content'>
                                                                <div className='files-list-item-content-item files-list-item-content-item-1'>{file.FileName}</div>
                                                            </div>
                                                        </li>)
                                                    }
                                                    )}</ul>
                                                </div>: ''
                                            }
                                            <div className='files-list'>
                                                <ul>{
                                                    (ui.files && ui.files.length) ? ui.files.map((file) => {
                                                        return <li className='files-list-item' key={file.id}>
                                                            <div className='files-list-item-preview'>
                                                                <img className='files-list-item-preview-image' src={file.preview.url} />
                                                            </div>
                                                            <div className='files-list-item-content'>
                                                                <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                                            </div>
                                                            <div
                                                                id={file.id}
                                                                className='files-list-item-remove'
                                                                onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                                                            ></div>
                                                        </li>
                                                    }) : ''}</ul>
                                            </div>

                                        </div>

                                        <div className="col-md-12 testdrive_actionbox">
                                            <div style={butttonGroup}>
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                                    <input type="button" value="Submit"
                                                        onClick={() => {
                                                            this.saveReportBug(reportBug)
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let testDriveId = ownProps.match.params.id;
    return {
        id: testDriveId,
        reportBug: state.reportBugState.reportBug
    }
};

export default connect(mapStateToProps)(ReportBugHome)
