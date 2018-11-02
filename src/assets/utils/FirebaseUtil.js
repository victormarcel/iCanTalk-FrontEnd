import {
    Alert
} from "react-native";
import firebase from 'react-native-firebase';

import {
    relateMessageToChat
} from "../utils";

export const getDeviceFcmToken = () => {

    return firebase.messaging().getToken()
        .then(fcmToken => {
             if (fcmToken) {
                return fcmToken;
            } else {

                return firebase.messaging().requestPermission()
                .then(fcmToken => {
                    Alert.alert("Token gerado novo", fcmToken);
                    return fcmToken;
                })
                .catch(error => {
                    Alert.alert("Erro Token", "Token");
                });

            } 
        });

}

export const fcmOnMessage = firebase.messaging().onMessage((message) => {
    
    const receivedMessageInfos = message.data;

    if(message.data.type === "chat_message"){

        const messageInfos = {
            secondaryUserId: receivedMessageInfos.senderId,
            secondaryUserName: receivedMessageInfos.senderName,
            secondaryUserFcmToken: receivedMessageInfos.senderFcmToken,
            secondaryUserPicturyUrl: receivedMessageInfos.senderPicturyUrl,
            isMyMessage: false,
            receivedMessageInfos: receivedMessageInfos
        }

        relateMessageToChat(messageInfos);

    }

});

// Criando ou recuperando um token para um device;
        /*firebase.messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
                console.log(fcmToken);
                // Create a RemoteMessage

            } else {
                console.log("Novo token: " + fcmToken);
            } 
        });

        //Pedindo permissão ao usuário para utilizar
        //o FCM;
        // firebase.messaging().requestPermission()
        // .then(teste => {
        //     console.log("teste123" + teste)
        // })
        // .catch(error => {
        //     // User has rejected permissions  
        // });

        this.notificationListener = firebase.notifications().onNotification((message) => {
            console.log(message);
        });

        this.messagerListener = firebase.messaging().onMessage((message) => {
            console.log(message);
        });*/