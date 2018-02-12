import validator from 'react-validation';
import * as React from 'react';
import * as $ from 'jquery';

export const required = 'required';


export const validateControl = (id: any, newValue?: any) => {
    var isFormValid = true;
    var target = $('#' + id);
    var value;
    var errorContainer;
    var validators;
    var selectControl = target.find('.Select-control');
    if (selectControl.length) {
        value = newValue || target.find('.Select-value').length;
        errorContainer = selectControl;
        validators = target.attr("data-validations");
    } else {
        value = target.val() || target.attr('data-value');
        errorContainer = target;
        validators = target.attr("data-validations");
    }

    value = value ? value.toString().trim() : '';

    validators = validators ? validators.split(',') : [required];
    validators && validators.length && validators.map(validator => {
        if (validator == 'required') {
            if (value.length) {
                $('#' + id + '-validation').remove();
            } else {
                if (errorContainer.length) {
                    $('#' + id + '-validation').remove();
                    errorContainer.after('<div class="error-container" id="' + id + '-validation"><span class="error-lable">This field is required</spand></div>');
                    isFormValid = false;
                }
            }
        }
    });
    return isFormValid;
}

export const validateForm = (formID: string) => {
    var isControlValid = true;
    var selectedInputs
    var isFormValid = true;
    let controlsToValidate = $('#' + formID + ' [data-validations]');
    controlsToValidate.each((index, control) => {
        if (control.id) {
            isControlValid = validateControl(control.id);
            isFormValid = isFormValid && isControlValid;
        } else {
            var id = $(control).find('input').id;
            isControlValid = validateControl(id);
            isFormValid = isFormValid && isControlValid;

        }
    })
    return isFormValid;
}

// export const validateControl = (e) => {
//     var isFormValid = true;
//     let target = $("[name='" + e.target.name + "']");
//     var errorContainer;
//     target = target.length == 0 ? $("[data-container-name='" + e.target.name + "']") : target;
//     target = target.last();
//     let controlName = e.target.name;
//     if(e.target.type && e.target.type == "custom-select"){
//         errorContainer = target.parent()
//     } else if(e.target.type && e.target.type == "custom-select-save"){
//         errorContainer = target.find('.Select-control');
//     } else{
//         errorContainer = target;
//     }
//     let value = e.target.value? e.target.value.toString() : '';
//     var validators = target.attr("data-validations");
//     validators = validators ? validators.split(',') : [required];
//     validators && validators.length && validators.map(validator => {
//         if (validator == 'required') {
//             if(value.length){
//                 $('#' + controlName + '-validation').remove();
//             }else{
//                 if (errorContainer.length) {
//                     $('#' + controlName + '-validation').remove();
//                     errorContainer.after('<div class="error-container" id="' + controlName + '-validation"><span class="error-lable">This field is required</spand></div>');
//                     isFormValid = false;
//                 }
//             } 
//         }
//     });

//     return isFormValid;
// }

// export const validateForm = () => {
//     var isControlValid = true;
//     var selectedInputs
//     var isFormValid = true;
//     let controlsToValidate = $('[data-validations]');
//     controlsToValidate.each((index,control) => {
//         var e = {
//             target: {
//                 type: control.type || 'custom-select-save',
//                 name: control.name || control.attributes["data-container-name"].value,
//                 value: control.value || []
//             }
//         };
//         isControlValid = validateControl(e);
//         isFormValid = isFormValid && isControlValid ;
//     })
//     return isFormValid;
// }