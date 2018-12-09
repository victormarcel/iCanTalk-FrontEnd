import { appLang } from "./appLang";
export const getStringByCode = stringCode => {

    let objectToUser;
    if(appLang == "pt"){
        objectToUser = ptBrStrings;
    } else {
        objectToUser = enBrStrings;
    }

    let stringToBeReturned;

    if(Boolean(objectToUser[stringCode])){
        stringToBeReturned = objectToUser[stringCode];
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
    SETTINGS: "Configurações",
    JOIN: "Entrar",
    AVALIATION: "Avaliação",
    DESCRIPTION: "Descrição",
    EDITION: "Edição",
    CANCEL: "Cancelar",

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

    SOCIAL_NETWORK_ONLINE_USERS: "Usuários online",
    SOCIAL_NETWORK_WELCOME_MESSAGE: "Bem-vindo a iCanTalk Network!\n\nPressione o botão \"Entrar\" e encontre novos usuários para praticar\num idioma.",

    APP_LANGUAGE: "Idioma da aplicação",
    APP_LANGUAGE_DESCRIPTION: "Defina o idioma da aplicação",
    APP_LANGUAGE_CHANGED: "Idioma alterado com sucesso.",
    APP_LANGUAGE_RESTART: "O idioma será alterado na próxima vez que o aplicativo for aberto. Deseja fechar o aplicativo?",

    DESCRIPTION_SAVED_SUCCES: "Descrição salva com sucesso.",
    DESCRIPTION_SAVED_ERROR: "Erro ao salvar a descrição.",

    EDIT_PICTURY: "Editar foto",
    SELECT_FROM_LIBRARY: "Selecionar da galeria",
    TAKE_PHOTO: "Tirar uma foto"

}

const enBrStrings = {

    NAME: "Name",
    EMAIL: "E-Mail",
    PHONE: "Phone",
    SEARCH: "Search",
    SAVE: "Save",
    ERROR: "Error",
    WELCOME: "Welcome",
    SOLICITATION: "Solicitation",
    SOLICITATIONS: "Solicitations",
    YES: "Yes",
    NO: "No",
    FRIENDS: "Friends",
    SUCCESS: "Success",
    ENGLISH: "English",
    PORTUGUESE: "Portuguese",
    TEXT: "Text",
    TRANSLATION: "Translation",
    TRANSLATE: "Translate",
    DEFINITIONS: "Definitions",
    EXAMPLES: "Examples",
    LANGUAGE: "Language",
    TYPE: "Type",
    AUDIO: "Audio",
    NONE: "None",
    INTERESTS: "Interests",
    SOCIAL: "Social",
    USERS: "Users",
    SETTINGS: "Settings",
    JOIN: "Join",
    AVALIATION: "Avaliation",
    DESCRIPTION: "Description",
    EDITION: "Edition",
    CANCEL: "Cancel",

    NEW_USER: "New User",
    TALKS: "Conversations",
    ADD_FRIEND: "Add friend",
    PREFERENCES: "Preferences",
    TRANSLATOR: "Translator",
    WAIT: "Wait",

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

    CONVERSATION_SOCIAL_NETWORK_BUTTON_LABEL: "New Friends",
    CONVERSATION_FRIENDS_BUTTON_LABEL: "Friends",

    RELATIONSHIP_LIST_TILE_FRIENDS: "Add Friends",
    RELATIONSHIP_SOLICITATION_ACCEPTED: "Solicitation has been accepted",
    RELATIONSHIP_SOLICITATION_RECUSE: "Do you want to refuse this solicitation?",
    RELATIONSHIP_SOLICITATION_RECUSED: "Solicitation refused",

    PREFERENCE_INFORMATIONS: "In this screen you can choose the language that\nthe messages will be received and the type\nthat will be received.",
    
    PREFERENCE_LANGUAGE_SAVE: "Language has been changed.",
    PREFERENCE_MESSAGE_TYPE_SAVE: "Message type has been changed",

    ADD_FRIENDS_ANY_SEARCHED_USERS: "No users was found.",
    SEND_SOLICITATION_QUESTION: function(userName){
        return `Do you want to send a solicitation to ${ userName } ?`
    },
    SEND_SOLICITATION_SUCCESS: "Solicitation has been sended!",

    TRANSLATOR_ANY_EXAMPLE_SEARCHED: "No examples was found.",
    TRANSLATOR_ANY_DEFINITION_SEARCHED: "No definitions was found.",

    SOCIAL_NETWORK_ONLINE_USERS: "Online Users",
    SOCIAL_NETWORK_WELCOME_MESSAGE: "Welcome to iCanTalk Network!\n\nTap the buttom \"Join\" and find new users to pratice a language.",

    APP_LANGUAGE: "App language",
    APP_LANGUAGE_DESCRIPTION: "Set the app language",
    APP_LANGUAGE_CHANGED: "Language has been changed.",
    APP_LANGUAGE_RESTART: "The language will be changed next time that app will opened. Do you want to close the app?",

    DESCRIPTION_SAVED_SUCCES: "Description has been saved.",
    DESCRIPTION_SAVED_ERROR: "Error to save the description.",
    
    EDIT_PICTURY: "Change pictury",
    SELECT_FROM_LIBRARY: "Select from library",
    TAKE_PHOTO: "Take Photo"

}