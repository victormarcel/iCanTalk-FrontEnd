import moment from 'moment';

import { 
    getItemOnDeviceLocalStorage,
    setItemOnDeviceLocalStorage
    
 } from "./DeviceLocalStorage";
import { store } from "../../../store";
import { 
    setConversations,
    setCurrentConversation,
    updateConversation,
    pushMessageToCurrentConversation
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

export const relateMessageToChat = (messageInfos) => {

    const searchedConversation = getConversationByUserId(messageInfos.secondaryUserId);
    const { message } = messageInfos.receivedMessageInfos;

    if(!searchedConversation){

        messageInfos.firstMessage = message;
        createConversation(messageInfos);

    } else {
        pushToConversationSendedMessage(searchedConversation, messageInfos);
    }

}

export const createConversation = (messageInfos) => {
    
    const conversation = createConversationObject(messageInfos);

    setCurrentConversationOnRedux(conversation);
    pushConversationOnRedux(conversation);
    saveConversationOnDeviceStorage(conversation);

}

export const createConversationObject = (messageInfos) => {

    const { message, audioUrl } = messageInfos.receivedMessageInfos;
    let buildedMessage = buildMessage(message, audioUrl, messageInfos.isMyMessage);

    const conversation = {
        SECONDARY_USER_ID: messageInfos.secondaryUserId.toString(),
        NAME: messageInfos.secondaryUserName,
        PICTURY_URL: messageInfos.secondaryUserPicturyUrl,
        FCM_TOKEN: messageInfos.secondaryUserFcmToken,
        MESSAGES: [buildedMessage],
        LAST_MESSAGE: messageInfos.firstMessage,
        LAST_MESSAGE_HOUR: moment().format("HH:MM")
    }

    return conversation;

}

export const buildMessage = (text, audioUrl, isMyMessage) => {

    return {
        "messageText": text,
        "messageAudioUrl": audioUrl,
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

export const pushToConversationSendedMessage = (conversation, messageInfos) => {

    const { message, audioUrl } = messageInfos.receivedMessageInfos;
    const buildedMessage = buildMessage(message, audioUrl, messageInfos.isMyMessage);

    conversation.LAST_MESSAGE = message;
    conversation.LAST_MESSAGE_HOUR = moment().format("HH:mm");

    updateCurrentConversation(buildedMessage);
    updateConversationOnRedux(conversation);
    pushMessageToSavedConversation(conversation, buildedMessage);

}

export const updateConversationOnRedux = conversation => {
    store.dispatch(updateConversation(conversation));
}

export const updateCurrentConversation = message => {
    store.dispatch(pushMessageToCurrentConversation(message));
}

export const saveConversationOnDeviceStorage = conversation => {

    getItemOnDeviceLocalStorage("conversations").then(conversations => {

        let conversationsAsJson;

        if(conversations){

            conversationsAsJson = JSON.parse(conversations);
            conversationsAsJson.push(conversation);
            
        } else {
            conversationsAsJson = [conversation];
        }

        setItemOnDeviceLocalStorage("conversations", JSON.stringify(conversationsAsJson));

    });

}

export const pushMessageToSavedConversation = (receivedConversation, message) => {

    getItemOnDeviceLocalStorage("conversations").then(conversations => {

        let conversationsAsJson = JSON.parse(conversations);

        conversationsAsJson.forEach(conversation => {

            if(conversation.SECONDARY_USER_ID === receivedConversation.SECONDARY_USER_ID){

                conversation.LAST_MESSAGE = receivedConversation.LAST_MESSAGE;
                conversation.LAST_MESSAGE_HOUR = receivedConversation.LAST_MESSAGE_HOUR;
                conversation.MESSAGES.push(message);

            }

        });

        setItemOnDeviceLocalStorage("conversations", JSON.stringify(conversationsAsJson));

    });

}