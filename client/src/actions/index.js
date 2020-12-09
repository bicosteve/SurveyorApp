import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/auth_user');
        return dispatch({ type: FETCH_USER, payload: res.data });
    };
};

export const postToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token);
    return dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => {
    return async (dispatch) => {
        const res = await axios.post('/api/surveys', values);
        history.push('/surveys');
        return dispatch({ type: FETCH_USER, payload: res.data });
    };
};

export const fetchSurveys = () => {
    return async (dispatch) => {
        const { data } = await axios.get('/api/surveys');
        dispatch({ type: FETCH_SURVEYS, payload: data });
    };
};
