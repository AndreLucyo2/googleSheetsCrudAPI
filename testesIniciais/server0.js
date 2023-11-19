// ref.: https://youtu.be/bnvXDee7-CQ?t=570
const { google } = require("googleapis");

const writeGoogle = async () => {
    //Autenticação: primeiro deve ser dado permissão ao usuário criado ver "client_email": "newcrud@newcrudgseets.iam.gserviceaccount.com",
    const auth = new google.auth.GoogleAuth({
        keyFile: "googleCredentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    //client service:
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({
        version: "v4",
        auth: authClientObject,
    });

    //dados para inserir na planilha:
    const dados = [
        ["ddd", "BBB1", "CCC1"],
        ["AAgggA2", "BBB2", "CCC2"],
        ["AAggggA3", "BBBkkk3", "55,55"],
    ];

    //planilha de teste:obter o id da planilha na url
    //https://docs.google.com/spreadsheets/d/1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q/edit#gid=0
    const spreadsheetId = "1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q";

    //instancia da planilha do google  
    //append - adiciona 
    //update sobecreve os dados

    await googleSheetsInstance.spreadsheets.values.update({
        auth,//Objeto de autenticação
        spreadsheetId,//ida da planilha
        range: "ABC!A:C", //nome da aba e celulas
        valueInputOption: "USER_ENTERED",//tipo de dado 
        resource: {
            values: dados
        }
    })
}


writeGoogle();
