import { getItemOnDeviceLocalStorage } from "./DeviceLocalStorage";

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