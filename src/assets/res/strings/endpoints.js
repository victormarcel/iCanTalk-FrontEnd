export const getEndPointByCode = endPointCode => {
    return endPoints[endPointCode];
}

const endPoints = {

    MAIN_APP: "https://icantalk.herokuapp.com/",
    USER_ADD: "usuario/add",
    LIST_USERS_TO_ADD: "usuario/listasemrelacionamento",
    NEW_SOLICITATION: "relacionamento/novasolicitacao"

}