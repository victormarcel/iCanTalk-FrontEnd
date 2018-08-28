import { AsyncStorage } from "react-native";

export const isRegisteredUser = () => {

    return AsyncStorage.getItem("isRegisteredUser").then((value) => {
    
        if(Boolean(value)){
            return true;
        } else {
            return false;
        }

    });
    
};