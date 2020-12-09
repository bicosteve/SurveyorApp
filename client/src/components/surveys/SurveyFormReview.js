import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';
import FIELDS from './formFields';

//show form inputs for review

const SurveyFormReview = (props) => {
    const fields = _.map(FIELDS, (field) => {
        return (
            <div key={field.name} style={{ marginBottom: '15px' }}>
                <label>{field.label}</label>
                <div>{props.formValues[field.name]}</div>
            </div>
        );
    });

    return (
        <div className='container'>
            <h4 style={{ textAlign: 'center', color: 'GrayText' }}>
                Please Confirm Your Entries
            </h4>
            {fields}
            <button
                className='blue-grey darken-3 white-text btn-flat'
                onClick={props.onCancel}>
                Back
            </button>
            <button
                className='blue-grey darken-3 btn-flat right white-text'
                onClick={() => props.submitSurvey(props.formValues, props.history)}>
                Submit Survey
                <i className='material-icons right'>email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
