import axios from 'axios';

import { getEndPointByCode } from "../res/strings";
import { 
    bindFormData
} from "../utils";

/**
 * 
 * @param {int} userId - Id do usuário que receberá a lista de usuários
 * para criar solicitações.
 * @param {string} info - Valor referência para buscar um usuário.
 */
export const getUserListBySomeInfo = (userId, info) => {

    const mainEndPoint = getEndPointByCode("MAIN_APP");
    const listUsersToAddEndPoint = getEndPointByCode("LIST_USERS_TO_ADD");

    return axios.get(`${mainEndPoint}${listUsersToAddEndPoint}`, {
        params: {
            ID_USUARIO: userId,
            INFORMACAO_USUARIO: info
        }
    })

}

/**
 * 
 * @param {int} primaryUserId - Id do usuário que está enviando
 * a solicitação.
 * @param {int} secondaryUserId - Id do usuario que irá receber a solicitação.
 * @returns {promise} Promessa da criação da solicitação.
 */
export const createSolicitation = (primaryUserId, secondaryUserId) => {

    const mainEndPoint = getEndPointByCode("MAIN_APP");
    const newSolicitationEndPoint = getEndPointByCode("NEW_SOLICITATION");
        
    let parameters = {
        primaryUserId,
		secondaryUserId
    };

    requestParameters = buildParametersToCreateSolicitation(parameters);

    return axios.post(`${mainEndPoint}${newSolicitationEndPoint}`, requestParameters);

}

/**
 * 
 * @param {object} data - Dados para criar os parâmetros de
 * uma nova solicitação.
 * 
 * @returns {object} Parâmetros para criar uma solicitação.
 */
const buildParametersToCreateSolicitation = data => {

    let parameters = {
        ID_USUARIO_PRIMARIO: data.primaryUserId,
		ID_USUARIO_SECUNDARIO: data.secondaryUserId
    };

    return bindFormData(parameters);

}