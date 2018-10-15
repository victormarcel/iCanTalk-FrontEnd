export const getEndPointByCode = endPointCode => {
    return endPoints[endPointCode];
}

const endPoints = {

    MAIN_APP: "https://icantalk.herokuapp.com",
    USER_ADD: "/usuario/add",
    LIST_USERS_TO_ADD: "/usuario/listasemrelacionamento",
    NEW_SOLICITATION: "/relacionamento/novorelacionamento",
    UPDATE_RELATIONSHIP_STATUS: "/relacionamento/atualizastatusrelacionamento",
    GET_USER_LIST_FRIENDS: "/relacionamento/listaamigos",
    GET_USER_SOLICITATIONS: "/relacionamento/solicitacoesporusuario",
    DELETE_RELATIONSHIP: "/relacionamento/removerelacionamento",
    SEND_MESSAGE: "/message/sendmessagebyfcmtoken",

    GET_USER_PREFERENCE: "/preferencias/obtemusuariopreferencias",
    UPDATE_USER_PREFERENCE: "/preferencias/atualizarpreferencias",

    GET_TEXT_TRANSLATE: "/translate/translatetext",
    GET_WORD_TRANSLATE: "/word/translationdefinitionexamples"

}