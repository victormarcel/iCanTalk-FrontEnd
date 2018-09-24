export const getStringByCode = stringCode => {

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
    SAVE: "Salvar",
    ERROR: "Erro",
    WELCOME: "Bem-Vindo",
    SOLICITATION: "Solicitação",
    SOLICITATIONS: "Solicitações",
    YES: "Sim",
    NO: "Não",
    FRIENDS: "Amigos",
    SUCCESS: "Sucesso",

    WELCOME_TEXT_1: "Está pronto para praticar um novo",
    WELCOME_TEXT_2: "idioma como nunca?",
    WELCOME_TEXT_3: "Clique no botão abaixo",
    WELCOME_TEXT_4: "e aproveite a melhor experiência para",
    WELCOME_TEXT_5: "estudar uma nova língua!",
    WELCOME_INIT_TEXT: "Seja bem-vindo ao iCanTalk!",

    REGISTER_TEXT_1: "Preencha os campos abaixo e comece",
    REGISTER_TEXT_2: "a praticar um novo idioma agora mesmo!!!",
    REGISTER_TEXT_SAVE_ERROR_1: "Preencha todos os campos do formulário antes de pressionar o botão 'Salvar'.",
    REGISTER_TEXT_SAVE_ERROR_2: "Não foi possível completar o registro!",

    CONVERSATION_SOCIAL_NETWORK_BUTTON_LABEL: "Novos Amigos",
    CONVERSATION_FRIENDS_BUTTON_LABEL: "Amigos",

    RELATIONSHIP_LIST_TILE_FRIENDS: "Adicionar Amigos",

    PREFERENCE_ENGLISH_LANGUAGE_OPTION: "Inglês",
    PREFERENCE_PORTUGUESE_LANGUAGE_OPTION: "Português",
    PREFERENCE_LANGUAGE_SELECT_TITLE: "Idioma",
    PREFERENCE_INFORMATIONS: "Nesta tela você pode escolher o idioma em que\nas mensagens serão recebidas e a forma\nem que elas chegarão.",

    ADD_FRIENDS_ANY_SEARCHED_USERS: "Nenhum usuário encontrado!",
    SEND_SOLICITATION_QUESTION: function(userName){
        return `Deseja enviar uma solicitação para ${ userName } ?`
    },
    SEND_SOLICITATION_SUCCESS: "Solicitação enviada com sucesso!"


}