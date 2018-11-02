import axios from 'axios';

import {
    bindFormData
} from "../utils";

import { getEndPointByCode } from "../res/strings";

const mainEndPoint = getEndPointByCode("MAIN_APP");

/**
 * Retorna a tradução de um texto.
 * 
 * @param {string} text - Texto a ser traduzido.
 * @param {*} languageCode - Códgio do idioma para traduzir o texto recebido.
 * 
 * @returns {string} Texto traduzido.
 */
export const translateText = (text, languageCode) => {

    const textTranslateEndPoint = getEndPointByCode("GET_TEXT_TRANSLATE");

    const parameters = {
        params: {
            TEXT: text,
            LANGUAGE_CODE: languageCode
        }
    }

    return axios.get(`${mainEndPoint}${textTranslateEndPoint}`, parameters)
    .then(response => {
        return response.data.translate;
    });

}

/**
 * Retorna a tradução, alguns significados e alguns exemplos de uso
 * da palavra recebida como parâmetro.
 * 
 * @param {string} word - Palavra a ser traduzido.
 * @param {*} languageCode - Códgio do idioma para traduzir a palavra recebida.
 * 
 * @returns {array} Conteúdo da tradução.
 */
export const translateWord = (word, languageCodeTo, languageCodeFrom) => {

    const wordTranslateEndPoint = getEndPointByCode("GET_WORD_TRANSLATE");

    const parameters = {
        params: {
            WORD: word,
            LANGUAGE_CODE_TO: languageCodeTo,
            LANGUAGE_CODE_FROM: languageCodeFrom
        }
    }

    return axios.get(`${mainEndPoint}${wordTranslateEndPoint}`, parameters)
    .then(response => {
        return response.data;
    });

}