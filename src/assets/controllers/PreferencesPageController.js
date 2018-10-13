import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { bindFormData } from "../utils";

const mainEndPoint = getEndPointByCode("MAIN_APP");

/**
 * 
 * Buscar as preferências relacionadas ao usuário
 * recebido como parâmetro.
 * 
 * @param {int} userId - Id do usuário referência na busca
 * das preferências.
 */
export const getUserPreferences = (userId) => {

    const getUserPreferencesEndPoint = getEndPointByCode("GET_USER_PREFERENCE");

    return axios.get(`${mainEndPoint}${getUserPreferencesEndPoint}`, {
        params: {
            USER_ID: userId
        }
    })
    .then(response => {
        return response.data.preferencias;
    }).catch(error => console.log(error));

};

/**
 * Atualiza as preferências do usuário recebido como parâmetro.
 * 
 * @param {int} userId  - Id do usuário a receber a preferência
 * @param {string} languageCode - Código do idioma a relacionar na preferência.
 */
export const updateUserPreferences = (userId, languageCode, messageType) => {

    const updatePreferencesEndPoint = getEndPointByCode("UPDATE_USER_PREFERENCE");
    const requestParameters = bindSavePreferencesLanguageParams(userId, languageCode, messageType);

    return axios.post(`${mainEndPoint}${updatePreferencesEndPoint}`, requestParameters)
        .then(() => {

           console.log("funcionou");

        })
        .catch(error => {
            throw(error);
        });

};

const bindSavePreferencesLanguageParams = (userId, languageCode, messageType) => {

    const parameters = {
        USER_ID: userId,
        LANGUAGE_CODE: languageCode,
        MESSAGE_TYPE: messageType
    };

    return bindFormData(parameters);

}