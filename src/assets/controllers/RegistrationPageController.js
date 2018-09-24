import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { 
    getDeviceFcmToken,
    setItemOnDeviceLocalStorage,
    bindFormData
} from "../utils";

const defaultUserImage = "https://centrik.in/wp-content/uploads/2017/02/user-image-.png";

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

            const userId = response.data.usuarioId;
            userInfos.id = userId;

            setItemOnDeviceLocalStorage("isRegisteredUser", "Y");
            setItemOnDeviceLocalStorage("userInfos", JSON.stringify(userInfos));

            return userId;

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
        URL_IMAGEM_PERFIL: defaultUserImage,
        FCM_TOKEN: userInfos.fcmToken
    }

    return bindFormData(parameters);

}