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

    WELCOME_TEXT_1: "Está pronto para praticar um novo",
    WELCOME_TEXT_2: "idioma como nunca?",
    WELCOME_TEXT_3: "Clique no botão abaixo",
    WELCOME_TEXT_4: "e aproveite a melhor experiência para",
    WELCOME_TEXT_5: "estudar uma nova língua!",

    REGISTER_TEXT_1: "Preencha os campos abaixo e comece",
    REGISTER_TEXT_2: "a praticar um novo idioma agora mesmo!!!"
}