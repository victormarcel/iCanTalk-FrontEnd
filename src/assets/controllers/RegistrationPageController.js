import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { getDeviceFcmToken } from "../utils";

/**
 * 
 * Registra um novo usuário a partir
 * dos dados recebidos como parâmetro.
 * 
 * @param {userInfos} userInfos - valores do usuario
 * a ser criado. 
 */
export const registerUser = userInfos => {

    const mainEndPoint = getEndPointByCode("MAIN_APP");
    const userAddEndPoint = getEndPointByCode("USER_ADD");
    
    return getDeviceFcmToken().then(fcmToken => {
        
        userInfos.fcmToken = fcmToken;
        requestParameters = buildRegisterUserParameters(userInfos);

        return axios.post(`${mainEndPoint}${userAddEndPoint}`, requestParameters)
        .then(response => {
            return response.data.usuarioId;
        })
        .catch(error => {
            throw(error);
        });

    })

}

/**
 * Retorna um objeto com os parâmetros para realizar
 * uma requisição de criação de usuário.
 * 
 * @param {object} userInfos  - Dados do usuário a ser
 * criado.
 * 
 * @returns {formData} - Parâmetros para a requisição.
 */
const buildRegisterUserParameters = userInfos => {

    var parameters = {
        NOME: userInfos.name,
        TELEFONE: userInfos.phone,
        EMAIL: userInfos.email,
        FCM_TOKEN: userInfos.fcmToken
    }

    return bindFormData(parameters);

}

/**
 * Retorna um "formData" a partir dos valores
 * recebidos como parâmetro.
 * 
 * @param {object} data - Valores para criar
 * o formData 
 * 
 * @returns - formData com os valores
 * recebidos como parâmetro.
 */
const bindFormData = data => {

    const formData = new FormData();

    for (var key in data) {
        formData.append(key, data[key]);
    }

    return formData;

}