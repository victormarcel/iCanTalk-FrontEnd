import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { bindFormData } from "../utils";

const mainEndPoint = getEndPointByCode("MAIN_APP");

export const getSubjectsByLang = (lang) => {

    const getSubjectsByLangEndPoint = getEndPointByCode("GET_SUBJECTS_BY_LANG");

    return axios.get(`${mainEndPoint}${getSubjectsByLangEndPoint}`, {
        params: {
            LANGUAGE: lang
        }
    })
    .then(response => {
        return response.data.assuntos
    }).catch(error => console.log(error));

};

export const getSubjectsByUser = (userId) => {

    const getSubjectsByUserEndPoint = getEndPointByCode("GET_SUBJECTS_BY_USER");

    return axios.get(`${mainEndPoint}${getSubjectsByUserEndPoint}`, {
        params: {
            USER_ID: userId
        }
    })
    .then(response => {
        return response.data.assuntos
    }).catch(error => console.log(error));

};

export const saveInterest = (userId, subjectId) => {

    const addUserInterestEndPoint = getEndPointByCode("ADD_USER_INTEREST");
    const requestParameters = bindInterestParams(userId, subjectId);

    return axios.post(`${mainEndPoint}${addUserInterestEndPoint}`, requestParameters)
        .then(() => {})
        .catch(error => {
            throw(error);
        });

};

const bindInterestParams = (userId, subjectId) => {

    const parameters = {
        USER_ID: userId,
        SUBJECT_ID: subjectId
    };

    return bindFormData(parameters);

}

export const removeInterest = (userId, subjectId) => {

    const removeUserInterestEndPoint = getEndPointByCode("DELETE_USER_INTEREST");

    return axios.delete(`${mainEndPoint}${removeUserInterestEndPoint}`, 
        {
            params: {
                USER_ID: userId,
                SUBJECT_ID: subjectId
            }
        }
    )

}