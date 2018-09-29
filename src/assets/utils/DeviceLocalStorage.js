import { AsyncStorage } from "react-native";

/**
 * 
 * @param {string} itemName - Nome da propriedade a ser criada no
 * armazenamento interno do celular.
 * @param {string} value - Valor da propriedade recebida como parâmetro
 * a ser criada no armazenamento interno do celular.
 */
export const setItemOnDeviceLocalStorage = (itemName, value) => {
    AsyncStorage.setItem(itemName, value);
}

/**
 * 
 * @param {string} itemName - Nome do item a ser retornado
 * do armazenamento interno do celular.
 */
export const getItemOnDeviceLocalStorage = itemName => {
    return AsyncStorage.getItem(itemName);
}

/**
 * Remove um item item do armazenamento interno do telefone
 * pelo nome recebido como parâmetro.
 * 
 * @param {string} itemName - Nome do item a ser removido
 * do armazenamento interno do celular.
 */
export const removeItemOnDeviceLocalStorage = itemName => {
    return AsyncStorage.removeItem(itemName);
}

/**
 * Concatena um valor recebido a um item no armazenamento
 * interno do celular.
 * 
 * @param {string} itemName - Nome do item a ser concatenado.
 * @param {stirng} value - Valor a ser concatenado.
 */
export const mergeItemOnDeviceLocalStorage = (itemName, value) => {
    return AsyncStorage.mergeItem(itemName, value);
}