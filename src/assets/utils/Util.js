import moment from 'moment';

import { 
    getItemOnDeviceLocalStorage,
    setItemOnDeviceLocalStorage
 } from "./DeviceLocalStorage";
import { store } from "../../../store";
import { 
    setConversations,
    setCurrentConversation,
    updateConversation
 } from "../../redux/actions";
 import { 
    sendMessageByFcmToken
} from "../controllers";

/**
 * Retorna se o celular que está rodando a aplicação
 * possui um usuário registrado.
 */
export const isRegisteredUser = () => {
    
    return getItemOnDeviceLocalStorage("isRegisteredUser").then((value) => {
    
        if(Boolean(value)){
            return true;
        } else {
            return false;
        }

    });
    
};

/**
 * Retorna as informações do usuário salvos no
 * armazenamento interno do celular.
 */
export const getUserinfosOnDeviceLocalStorage = () => {
    return getItemOnDeviceLocalStorage("userInfos");
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
export const bindFormData = data => {

    const formData = new FormData();

    for (var key in data) {
        formData.append(key, data[key]);
    }

    return formData;

}

export const getConversationByUserId = userId => {

    const reduxState = store.getState();
    const conversations = reduxState.conversations;
    let searchedConversation = [];

    searchedConversation = conversations.filter(conversation => {
        return conversation.SECONDARY_USER_ID === userId;
    });

    if(searchedConversation.length === 0){
        return null;
    } else {
        return searchedConversation[0];
    }

}

export const relateMessageToChat = (messageInfos, message) => {

    const searchedConversation = getConversationByUserId(messageInfos.secondaryUserId);

    if(!searchedConversation){

        messageInfos.firstMessage = message;
        createConversation(messageInfos, messageInfos.isMyMessage);

    } else {
        pushToConversationSendedMessage(searchedConversation, message);
    }

}

export const createConversation = (messageInfos, isMyFirstMessage) => {
    
    const conversation = createConversationObject(messageInfos, isMyFirstMessage);
    setCurrentConversationOnRedux(conversation);
    pushConversationOnRedux(conversation);

}

export const createConversationObject = (messageInfos, isMyFirstMessage) => {

    let message = buildMessage(messageInfos.firstMessage, isMyFirstMessage);

    const conversation = {
        SECONDARY_USER_ID: messageInfos.secondaryUserId.toString(),
        NAME: messageInfos.secondaryUserName,
        PICTURY_URL: messageInfos.secondaryUserPicturyUrl,
        FCM_TOKEN: messageInfos.secondaryUserFcmToken,
        MESSAGES: [message],
        LAST_MESSAGE: messageInfos.firstMessage,
        LAST_MESSAGE_HOUR: moment().format("HH:MM")
    }

    return conversation;

}

export const buildMessage = (text, isMyMessage) => {

    return {
        "messageText": text,
        "messageHour": moment().format("HH:mm"),
        "isMyMessage": isMyMessage
    }

}

export const pushConversationOnRedux = conversation => {
    store.dispatch(setConversations([conversation]));
}

export const setCurrentConversationOnRedux = conversation => {
    store.dispatch(setCurrentConversation(conversation));
}

export const pushToConversationSendedMessage = (conversation, message) => {

    const buildedMessage = buildMessage(message, true);
    conversation.MESSAGES.push(buildedMessage);
    conversation.LAST_MESSAGE = message;
    conversation.LAST_MESSAGE_HOUR = moment().format("HH:mm")

    updateConversationOnRedux(conversation);

}

export const updateConversationOnRedux = conversation => {
    store.dispatch(updateConversation(conversation));
}

// export const saveConversationOnDeviceStorage = conversation => {

//     var conversations = getItemOnDeviceLocalStorage("conversations");

// }