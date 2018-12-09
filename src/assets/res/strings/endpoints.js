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
    GET_WORD_TRANSLATE: "/word/translationdefinitionexamples",

    GET_SUBJECTS_BY_LANG: "/subjects/getsubjectsbylang",
    GET_SUBJECTS_BY_USER: "/subjects/getsubjectsbyuser",

    ADD_USER_INTEREST: "/subjects/insertusersubjectrelationship",
    DELETE_USER_INTEREST: "/subjects/deleteusersubjectrelationship",

    JOIN_USER_TO_SOCIAL_NETWORK: "/socialnetwork/join",
    LEAVE_USER_TO_SOCIAL_NETWORK: "/socialnetwork/leave",

    UPDATE_USER_DESCRIPTION: "/user/updatedescription",

    SAVE_USER_PICTURY: "/user/savepictury",

}