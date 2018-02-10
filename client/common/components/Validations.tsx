import validator from 'react-validation';
import * as React from 'react';
import * as $ from 'jquery';

export const required = 'required';

export const validateControl = (e) => {
    let target = $("[name='" + e.target.name + "']");
    let value = target.val();
    var validators = target.attr("data-validations");
    validators = validators ? validators.split(',') : [required];
    validators && validators.length && validators.map(validator => {
        if (validator == 'required') {
            if (!value.toString().trim().length) {
                target.after('<div class="error-container" id="' + target.name + '-validation"><span class="error-lable">This field is required</spand></div>');
            } else {
                $('#' + target.name + '-validation').remove();
            }
        }
    });
}