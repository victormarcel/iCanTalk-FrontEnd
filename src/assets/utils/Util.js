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