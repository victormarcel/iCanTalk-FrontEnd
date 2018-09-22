export const returnStringByCode = stringCode => {

    let stringToBeReturned;

    if(Boolean(ptBrStrings[stringCode])){
        stringToBeReturned = ptBrStrings[stringCode];
    } else {
        stringToBeReturned = "";
    }

    return stringToBeReturned;

}

const ptBrStrings = {

    NAME: "Nome",
    EMAIL: "E-Mail",
    PHONE: "Telefone",
    SEARCH: "Buscar",

    WELCOME_TEXT_1: "Está pronto para praticar um novo",
    WELCOME_TEXT_2: "idioma como nunca?",
    WELCOME_TEXT_3: "Clique no botão abaixo",
    WELCOME_TEXT_4: "e aproveite a melhor experiência para",
    WELCOME_TEXT_5: "estudar uma nova língua!",

    REGISTER_TEXT_1: "Preencha os campos abaixo e comece",
    REGISTER_TEXT_2: "a praticar um novo idioma agora mesmo!!!",

    CONVERSATION_SOCIAL_NETWORK_BUTTON_LABEL: "Novos Amigos",
    CONVERSATION_FRIENDS_BUTTON_LABEL: "Amigos",

    RELATIONSHIP_LIST_TILE_SOLICITATIONS: "Solicitações",
    RELATIONSHIP_LIST_TILE_FRIENDS: "Amigos",
    RELATIONSHIP_LIST_TILE_FRIENDS: "Adicionar Amigos",

    PREFERENCE_ENGLISH_LANGUAGE_OPTION: "Inglês",
    PREFERENCE_PORTUGUESE_LANGUAGE_OPTION: "Português",
    PREFERENCE_LANGUAGE_SELECT_TITLE: "Idioma",
    PREFERENCE_INFORMATIONS: "Nesta tela você pode escolher o idioma em que\nas mensagens serão recebidas e a forma\nque elas chegarão."


}