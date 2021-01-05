import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    className='survey-form'
                    key={name}
                    component={SurveyField}
                    type='text'
                    label={label}
                    name={name}
                />
            );
        });
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link
                        to='/surveys'
                        className='blue-grey darken-3 btn-flat white-text'>
                        Cancel
                    </Link>
                    <button
                        className='blue-grey darken-3 btn-flat right white-text'
                        type='submit'>
                        Preview
                        <i className='material-icons right'>navigate_next</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(FIELDS, ({ name, valueError }) => {
        if (!values[name]) {
            errors[name] = valueError;
        }
    });

    return errors;
};

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);

//shows form for user to add input
