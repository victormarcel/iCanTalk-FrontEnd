import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { bindFormData } from "../utils";

let mainEndPoint = getEndPointByCode("MAIN_APP");

/**
 * Retorna a lista de solicitações do usuário recebido
 * como parâmetro.
 * 
 * @param {int} userId - Id do usuário referência para buscar
 * as solicitações;
 * 
 * @returns solicitações do usuário recebido com parâmetro;
 */
export const getSolicitationsByUser = userId => {

    let solicitationByUser = getEndPointByCode("GET_USER_SOLICITATIONS");

    return axios.get(`${mainEndPoint}${solicitationByUser}`, {
        params: {
            ID_USUARIO: userId,
        }
    })
    .then(response => {
        return response.data.solicitacoes;
    });

}

/**
 * 
 * Retorna a lista de amigos do usuário recebido como
 * parâmetro.
 * 
 * @param {int} userId - Id do usuário referência para buscar
 * as solicitações;
 * 
 * @returns amigos do usuário recebido com parâmetro;
 */
export const getFriendsByUser = userId => {

    let friendsByUser = getEndPointByCode("GET_USER_LIST_FRIENDS");

    return axios.get(`${mainEndPoint}${friendsByUser}`, {
        params: {
            ID_USUARIO: userId,
        }
    })
    .then(response => {
        return response.data.amigos;
    }).catch(error => console.log(error));

}

/**
 * Aceitar uma solicitação.
 * 
 * @param {object} solicitation - Dados da solicitação
 * a ser aceita.
 */
export const acceptSolicitation = solicitation => {

    const newSolicitationEndPoint = getEndPointByCode("NEW_SOLICITATION");
    const updateSolicitationStatusEndPoint = getEndPointByCode("UPDATE_RELATIONSHIP_STATUS");

    let requestParameters = buildParametersToCreateNewRelationshipBySolicitation(solicitation);

    return axios.post(`${mainEndPoint}${newSolicitationEndPoint}`, requestParameters)
        .then(response => {

            requestParameters = buildParametersToUpdateRelationshipStatus(solicitation);

            return axios.post(`${mainEndPoint}${updateSolicitationStatusEndPoint}`, requestParameters)
                .then(response => {
                    console.log("teste");
                })
                .catch(error => {
                    throw(error);
                }
            );
            

        })
        .catch(error => {
            throw(error);
        }
    );

}

/**
 * Remove uma solicitação.
 * 
 * @param {object} solicitation - Dados da solicitação a ser
 * removida.
 */
export const removeSolicitation = solicitation => {

    const removeSolicitationEndPoint = getEndPointByCode("DELETE_RELATIONSHIP");
    const solicitationId = solicitation.ID_RELACIONAMENTO;

    return axios.delete(`${mainEndPoint}${removeSolicitationEndPoint}`, 
        {
            params: {
                ID_RELACIONAMENTO: solicitationId
            }
        }
    )

}

const buildParametersToCreateNewRelationshipBySolicitation = data => {

    const parameters = {
        ID_USUARIO_PRIMARIO: data.ID_USUARIO_SECUNDARIO,
        ID_USUARIO_SECUNDARIO: data.ID_USUARIO_PRIMARIO,
        ID_STATUS_RELACIONAMENTO: 2
    };

    return bindFormData(parameters);

}

const buildParametersToUpdateRelationshipStatus = data => {

    const parameters = {
        ID_RELACIONAMENTO: data.ID_RELACIONAMENTO,
        ID_STATUS_RELACIONAMENTO: 2
    };

    return bindFormData(parameters);

}