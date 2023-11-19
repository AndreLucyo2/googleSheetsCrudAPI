// ref.: https://youtu.be/bnvXDee7-CQ?t=570
const { google } = require("googleapis");

const writeGoogle = async (dadosAA, plan, rangeCell, { metod = "UPDATE" } = {}) => {
    //Autenticação: primeiro deve ser dado permissão ao usuário criado ver "client_email": "newcrud@newcrudgseets.iam.gserviceaccount.com",
    const auth = new google.auth.GoogleAuth({
        keyFile: "googleCredentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    console.log(auth);

    //client service:
    const authClientObject = await auth.getClient(() => {
        console.log(authClientObject);
    });

    const googleSheetsInstance = google.sheets({
        version: "v4",
        auth: authClientObject,
    });
    console.log(googleSheetsInstance);

    //planilha de teste:obter o id da planilha na url
    //https://docs.google.com/spreadsheets/d/1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q/edit#gid=0
    const spreadsheetId = "1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q";

    const rangeC = `${plan}!${rangeCell}`;

    const objData = {
        auth,//Objeto de autenticação
        spreadsheetId,//ida da planilha
        range: rangeC, //nome da aba e celulas
        valueInputOption: "USER_ENTERED",//tipo de dado 
        resource: {
            values: dadosAA
        }
    }

    //instancia da planilha do google  
    //append - adiciona 
    //update sobecreve os dados
    metod = metod.toUpperCase();

    switch (metod) {
        case "APPEND":
            await googleSheetsInstance.spreadsheets.values.append(objData);
            break;

        case "UPDATE":
            await googleSheetsInstance.spreadsheets.values.update(objData);

            break;

        default:
            await googleSheetsInstance.spreadsheets.values.append(objData);
            break;
    };
};



//----------------------------------------------
const dadosA = [
    ["rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", "BBB1", "CCC1"],
    ["qq2", "BBB2", "CCC2"],
    ["qq3", "BBBkkk3", "55,55"],
];

//Nome da aba 
const planName = "Plan1";

//Célula de ref.
const range = "A10";

writeGoogle(dadosA, planName, range, { metod: "APPEND" });
