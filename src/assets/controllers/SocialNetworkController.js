import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { 
    bindFormData,
    showOnlineUsers,
    setOnlineUsersOnRedux,
    resetOnlineUsersOnRedux
 } from "../utils";

let mainEndPoint = getEndPointByCode("MAIN_APP");


export const joinUserToSocialNetwork = userId => {

    const joinUserEndPoint = getEndPointByCode("JOIN_USER_TO_SOCIAL_NETWORK");

    let requestParameters = buildParametersUserId(userId);

    return axios.post(`${mainEndPoint}${joinUserEndPoint}`, requestParameters)
        .then(response => {
            showOnlineUsers(response.data.usuarios);
        })
        .catch(error => {
            throw(error);
        }
    );

}

export const leaveUserToSocialNetwork = userId => {

    const leaveUserEndPoint = getEndPointByCode("LEAVE_USER_TO_SOCIAL_NETWORK");

    let requestParameters = buildParametersUserId(userId);

    return axios.post(`${mainEndPoint}${leaveUserEndPoint}`, requestParameters)
        .then(() => {
            
            setOnlineUsersOnRedux(0);
            resetOnlineUsersOnRedux();

        })
        .catch(error => {
            throw(error);
        }
    );

}

const buildParametersUserId = userId => {

    const parameters = {
        USER_ID: userId
    };

    return bindFormData(parameters);

}

/*
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
/*
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

}*/
