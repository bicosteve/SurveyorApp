//survey field contains logic to render single label and text input

import React from 'react';

const SurveyField = (props) => {
    //console.log(props.input);
    return (
        <div>
            <label>{props.label}</label>
            <input {...props.input} style={{ marginBottom: '3px' }} />
            <div className='red-text' style={{ marginBottom: '15px' }}>
                {props.meta.touched && props.meta.error}
            </div>
        </div>
    );
};

export default SurveyField;
