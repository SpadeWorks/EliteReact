import validator from 'react-validation';
import * as React from 'react';
import * as $ from 'jquery';

export const required = 'required';

export const validateControl = (e) => {
    var isFormValid = true;
    let target = $("[name='" + e.target.name + "']");
    var errorContainer;
    target = target.length == 0 ? $("[data-container-name='" + e.target.name + "']") : target;
    let controlName = e.target.name;
    if(e.target.type && e.target.type == "custom-select"){
        errorContainer = target.parent()
    } else if(e.target.type && e.target.type == "custom-select-save"){
        errorContainer = target.find('.Select-control');
    } else{
        errorContainer = target;
    }
    let value = e.target.value;
    var validators = target.attr("data-validations");
    validators = validators ? validators.split(',') : [required];
    validators && validators.length && validators.map(validator => {
        if (validator == 'required') {
            if (!value || !value.length) {
                if (errorContainer.length) {
                    $('#' + controlName + '-validation').remove();
                    errorContainer.after('<div class="error-container" id="' + controlName + '-validation"><span class="error-lable">This field is required</spand></div>');
                    isFormValid = false;
                }
            } else {
                $('#' + controlName + '-validation').remove();
            }
        }
    });

    return isFormValid;
}

export const validateForm = () => {
    var isControlValid = true;
    var selectedInputs
    var isFormValid = true;
    let controlsToValidate = $('[data-validations]');
    controlsToValidate.each((index,control) => {
        var e = {
            target: {
                type: control.type || 'custom-select-save',
                name: control.name || control.attributes["data-container-name"].value,
                value: control.value || []
            }
        };
        isControlValid = validateControl(e);
        isFormValid = isFormValid && isControlValid ;
    })
    return isFormValid;
}