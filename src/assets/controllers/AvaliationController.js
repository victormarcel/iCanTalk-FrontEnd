import moment from 'moment';
import axios from "axios";

import { store } from "../../../store";
import { 
    getEndPointByCode
} from "../res/strings";

import { 
    bindFormData,
    setItemOnDeviceLocalStorage,
    getItemOnDeviceLocalStorage,
    removeItemOnDeviceLocalStorage
} from "../utils";

const AVALIATIONS_BY_DAY = 3;
const mainEndPoint = getEndPointByCode("MAIN_APP");

var initialAvaliations = {
    day: moment().format("DD/MM/YYYY"),
    avaliationsBy: []
}

export const isEvaluable = (currentConversation) => {

    const evaluatedId = currentConversation.SECONDARY_USER_ID;
    const messages = currentConversation.MESSAGES;

    return getItemOnDeviceLocalStorage("avaliations").then(avaliations => {

        let avaliationsAsJson;

        if(!avaliations){

            avaliationsAsJson = initialAvaliations;
            setItemOnDeviceLocalStorage("avaliations", JSON.stringify(avaliationsAsJson));

        } else {
            avaliationsAsJson = JSON.parse(avaliations);
        }

        const curDate = moment().format("DD/MM/YYYY");

        if(avaliationsAsJson.day != curDate) {

            avaliationsAsJson.day = curDate;
            avaliationsAsJson.avaliationsBy = [];
            setItemOnDeviceLocalStorage("avaliations", JSON.stringify(avaliationsAsJson));

        }

        let avaliationsArray = avaliationsAsJson.avaliationsBy;

        if(avaliationsArray.length == AVALIATIONS_BY_DAY){
            return false;
        }

        const evaluated = avaliationsArray.filter(avaliationEvaluated => {
            return evaluatedId == avaliationEvaluated.id;
        });

        if(evaluated.length > 0){
            return false;
        }

        if(messages){

            let secondaryMessages = 0;
            messages.forEach(message =>{
                
                if(message.isMyMessage === false){
                    secondaryMessages++;
                }

            });

            if(secondaryMessages < 20) {
                return false;
            }

        } else {
            return false;
        }

        return true;

    });

}

export const getUserAvaliations = (userId) => {

    const getUserAvaliationsEndPoint = getEndPointByCode("GET_USER_AVALIATIONS");

    return axios.get(`${mainEndPoint}${getUserAvaliationsEndPoint}`, {
        params: {
            ID_USUARIO: userId
        }
    })
    .then(response => {
        return response.data.avaliacoes;
    }).catch(error => console.log(error));

};

export const saveAvaliation = (evaluated, evaluator, avaliationId, value) => {

    const saveAvaliationEndPoint = getEndPointByCode("SAVE_AVALIATION");
    const parameters = {
        ID_USUARIO_AVALIADOR: evaluator,
        ID_USUARIO_AVALIADO: evaluated,
        ID_AVALIACAO: avaliationId,
        VALOR_AVALIACAO: value,
        DATA_AVALIACAO: moment().format("DD/MM/YYYY")
    }

    const requestParameters = bindFormData(parameters);

    return axios.post(`${mainEndPoint}${saveAvaliationEndPoint}`, requestParameters).then(response => {
        return response;
    });

}

export const saveAvaliationOnDevice = evaluatedId => {

    return getItemOnDeviceLocalStorage("avaliations").then(avaliations => {

        let avaliationAsJson = JSON.parse(avaliations);
        avaliationAsJson.avaliationsBy.push({id: evaluatedId});

        setItemOnDeviceLocalStorage("avaliations", JSON.stringify(avaliationAsJson));

    });

}
