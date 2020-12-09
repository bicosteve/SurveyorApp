import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys = () => {
        return this.props.surveys.reverse().map((survey) => {
            return (
                <div className='card blue-grey darken-3' key={survey._id}>
                    <div className='card-content white-text'>
                        <span className='card-title' style={{ fontSize: '25px' }}>
                            {survey.title}
                        </span>
                        <p>{survey.body}</p>
                        <p className='right'>
                            Created -{' '}
                            {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className='card-action'>
                        <a href='#'>Yes Votes: {survey.yes}</a>
                        <a href='#'>No Votes: {survey.no}</a>
                    </div>
                </div>
            );
        });
    };

    render() {
        return <div className='container'>{this.renderSurveys()}</div>;
    }
}

function mapStateToProps(state) {
    return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
