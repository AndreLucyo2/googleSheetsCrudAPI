
const { google } = require("googleapis");
const credentials = require('./googleCredentials.json'); //Não versionar as credenciais - criar crdenciais no googleCloud

//ID da planilha: ver na URL da planilha:
const spreadsheetId = '1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q';

//Autenticação: primeiro deve ser dado permissão ao usuário criado ver "client_email": "newcrud@newcrudgseets.iam.gserviceaccount.com",
async function authenticate() {
    const auth = await new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({
        version: 'v4',
        auth
    });
}

async function createRange(values, plan, cells) {
    //instancia da planilha do google ja autenticada: 
    const googleSheetsInstance = await authenticate();

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId,//ida da planilha
        range: range, //nome da aba e celulas
        insertDataOption: 'INSERT_ROWS',
        valueInputOption: "USER_ENTERED",
        resource: {
            values: values
        }
    }

    try {
        const response = await googleSheetsInstance.spreadsheets.values.append(request);
        console.log('Registro atualizado:', response.data);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err.message);
    }

}

async function updateRange(values, plan, cells) {
    //instancia da planilha do google ja autenticada: 
    const googleSheetsInstance = await authenticate();

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId,//ida da planilha
        range: range, //nome da aba e celulas
        valueInputOption: 'RAW',
        resource: {
            values: values
        }
    }

    try {
        const response = await googleSheetsInstance.spreadsheets.values.update(request);
        console.log('Registro atualizado:', response.data);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err.message);
    }

}

async function clearRange(plan, cells) {
    const googleSheetsInstance = await authenticate();

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId,
        range: range
    }

    try {
        const response = await googleSheetsInstance.spreadsheets.values.clear(request);
        console.log('Registro excluido:', response.data);
    } catch (err) {
        console.error('Erro ao excluir registro:', err.message);
    }

}

async function getRange(plan, cells) {
    const googleSheetsInstance = await authenticate();

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId,
        range: range
    }

    try {
        const response = await googleSheetsInstance.spreadsheets.values.get(request);
        const values = response.data.values;
        console.log('Registros lidos:', values);

    } catch (err) {
        console.error('Erro ao ler registros:', err.message);
    }

}

//criar a planilha e tornar outro usuário proprietário:











module.exports = {
    createRange,
    clearRange,
    updateRange,
    getRange,
};


//----------------------------------------------
//clearRange("Plan1", "A1:M1");



//----------------------------------------------
const valores = [
    ["AAA", "BBB", "CCC"],
    ["DDD", "EEE", "FFF"],
    ["GGG", "HHH", "JJJ"],
];
//createRange(valores, "Plan1", "A1");



//----------------------------------------------
const valores1 = [
    ["888", "HHH", "KKK"],
    ["LLL", "PPP", "ZZZ"],
    ["MMM", "UUU", "YYY"],
];
//updateRange(valores1, "Plan1", "A1");


//----------------------------------------------
//getRange("Plan1", "A:H");
