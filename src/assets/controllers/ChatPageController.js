import axios from 'axios';
import { Alert } from "react-native";
import { getEndPointByCode } from "../res/strings";
import { 
    bindFormData
} from "../utils";

const mainEndPoint = getEndPointByCode("MAIN_APP");

export const sendMessageByFcmToken = (fcmToken, senderId, message) => {

    const sendMessageEndPoint = getEndPointByCode("SEND_MESSAGE");
    const parameters = {
        MESSAGE: message,
        FCM_TOKEN: fcmToken,
        SENDER_ID: senderId
    }

    const requestParameters = bindFormData(parameters);

    axios.post(`${mainEndPoint}${sendMessageEndPoint}`, requestParameters);

}