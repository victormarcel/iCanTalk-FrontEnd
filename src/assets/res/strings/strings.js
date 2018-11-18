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
    ENGLISH: "Inglês",
    PORTUGUESE: "Português",
    TEXT: "Texto",
    TRANSLATION: "Tradução",
    TRANSLATE: "Traduzir",
    DEFINITIONS: "Definições",
    EXAMPLES: "Exemplos",
    LANGUAGE: "Idioma",
    TYPE: "Tipo",
    AUDIO: "Áudio",
    NONE: "Nenhum",
    INTERESTS: "Interesses",
    SOCIAL: "Social",
    USERS: "Usuários",

    NEW_USER: "Novo Usuário",
    TALKS: "Conversas",
    ADD_FRIEND: "Adicionar Amigo",
    PREFERENCES: "Preferências",
    TRANSLATOR: "Tradutor",
    WAIT: "Aguarde",

    WELCOME_TEXT_1: "Está pronto para praticar um novo",
    WELCOME_TEXT_2: "idioma como nunca?",
    WELCOME_TEXT_3: "Clique no botão abaixo",
    WELCOME_TEXT_4: "e aproveite a melhor experiência para",
    WELCOME_TEXT_5: "estudar uma nova língua!",
    WELCOME_INIT_TEXT: "Seja bem-vindo ao iCanTalk!",
    WELCOME_BUTTON_TEXT: "Vamos Começar",

    REGISTER_TEXT_1: "Preencha os campos abaixo e comece",
    REGISTER_TEXT_2: "a praticar um novo idioma agora mesmo!!!",
    REGISTER_TEXT_SAVE_ERROR_1: "Preencha todos os campos do formulário antes de pressionar o botão 'Salvar'.",
    REGISTER_TEXT_SAVE_ERROR_2: "Não foi possível completar o registro!",

    CONVERSATION_SOCIAL_NETWORK_BUTTON_LABEL: "Novos Amigos",
    CONVERSATION_FRIENDS_BUTTON_LABEL: "Amigos",

    RELATIONSHIP_LIST_TILE_FRIENDS: "Adicionar Amigos",
    RELATIONSHIP_SOLICITATION_ACCEPTED: "Solicitação aceita com sucesso!",
    RELATIONSHIP_SOLICITATION_RECUSE: "Deseja recusar esta solicitação?",
    RELATIONSHIP_SOLICITATION_RECUSED: "Solicitação recusada!",

    PREFERENCE_INFORMATIONS: "Nesta tela você pode escolher o idioma em que\nas mensagens serão recebidas e a forma\nem que elas chegarão.",
    PREFERENCE_LANGUAGE_SAVE: "Idioma alterado com sucesso.",
    PREFERENCE_MESSAGE_TYPE_SAVE: "Tipo de mensagem alterado com sucesso",

    ADD_FRIENDS_ANY_SEARCHED_USERS: "Nenhum usuário encontrado!",
    SEND_SOLICITATION_QUESTION: function(userName){
        return `Deseja enviar uma solicitação para ${ userName } ?`
    },
    SEND_SOLICITATION_SUCCESS: "Solicitação enviada com sucesso!",

    TRANSLATOR_ANY_EXAMPLE_SEARCHED: "Nenhum exemplo encontrado.",
    TRANSLATOR_ANY_DEFINITION_SEARCHED: "Nenhuma definição encontrada.",

    SOCIAL_NETWORK_ONLINE_USERS: "Usuários online"


}