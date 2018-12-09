import axios from 'axios';
import { getEndPointByCode } from "../res/strings";
import { 
    bindFormData,
    setItemOnDeviceLocalStorage,
    getItemOnDeviceLocalStorage
} from "../utils";

const mainEndPoint = getEndPointByCode("MAIN_APP");

export const saveUserPictury = (userId, picturyBase64) => {

    const saveUserPictury = getEndPointByCode("SAVE_USER_PICTURY");
    const parameters = {
        ID_USUARIO: userId,
        PICTURY_BASE64: picturyBase64
    }

    const requestParameters = bindFormData(parameters);

    return axios.post(`${mainEndPoint}${saveUserPictury}`, requestParameters).then(response => {
        return response;
    });

}

export const setUserImageUrlOnLocalStorageDevice = url => {

    getItemOnDeviceLocalStorage("userInfos").then(userInfos => {

        if(userInfos){
            
            userInfosAsJson = JSON.parse(userInfos);
            userInfosAsJson.pictureUrl = url;

            setItemOnDeviceLocalStorage("userInfos", JSON.stringify(userInfosAsJson));

        }

    });

}