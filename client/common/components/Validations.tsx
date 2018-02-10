import validator from 'react-validation';
import * as React from 'react';
import * as $ from 'jquery';

export const required = 'required';

export const validateControl = (e) => {
    let target = $("[name='" + e.target.name + "']");
    let controlName = e.target.name;
    let parent = (e.target.type && e.target.type == "custom-select") ? target.parent() : target;
    let value = e.target.value;
    var validators = target.attr("data-validations");
    validators = validators ? validators.split(',') : [required];
    validators && validators.length && validators.map(validator => {
        if (validator == 'required') {
            if (!value || !value.length) {
                if (parent.length) {
                    parent.after('<div class="error-container" id="' + controlName + '-validation"><span class="error-lable">This field is required</spand></div>');
                }
            } else {
                $('#' + controlName + '-validation').remove();
            }
        }
    });
}