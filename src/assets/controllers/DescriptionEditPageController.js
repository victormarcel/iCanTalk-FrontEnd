import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { 
    bindFormData,
    getItemOnDeviceLocalStorage,
    setItemOnDeviceLocalStorage
} from "../utils";

const mainEndPoint = getEndPointByCode("MAIN_APP");

export const updateUserDescription = (userId, description) => {

    const updateUserDescription = getEndPointByCode("UPDATE_USER_DESCRIPTION");
    const parameters = {
        ID_USUARIO: userId,
        DESCRICAO: description
    }

    const requestParameters = bindFormData(parameters);

    return axios.post(`${mainEndPoint}${updateUserDescription}`, requestParameters);

}

export const setUserDescriptionOnLocalStorageDevice = description => {

    getItemOnDeviceLocalStorage("userInfos").then(userInfos => {

        if(userInfos){
            
            userInfosAsJson = JSON.parse(userInfos);
            userInfosAsJson.description = description;

            setItemOnDeviceLocalStorage("userInfos", JSON.stringify(userInfosAsJson));

        }

    });

}