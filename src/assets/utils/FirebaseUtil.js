import {Alert} from "react-native";
import firebase from 'react-native-firebase';

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