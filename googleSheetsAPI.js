
const { google } = require("googleapis");
const GOOGLE_CREDENTIALS = require('./googleCredentials.json'); //Não versionar as credenciais - criar crdenciais no googleCloud

//ID da planilha: ver na URL da planilha:
const SPREADSHEET_ID = '1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q';

//Autenticação: primeiro deve ser dado permissão ao usuário criado ver "client_email": "newcrud@newcrudgseets.iam.gserviceaccount.com",
async function authenticate() {
    const auth = await new google.auth.GoogleAuth({
        credentials: GOOGLE_CREDENTIALS,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ],
    });

    const googleAuth = {
        sheets: google.sheets({ version: 'v4', auth }),
        drive: google.drive({ version: 'v3', auth })
    }

    return googleAuth;
}

async function createRange(values, plan, cells) {
    //instancia da planilha do google ja autenticada: 
    const googleAuth = await authenticate();
    const googleSheetsInstance = googleAuth.sheets;

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId: SPREADSHEET_ID,//ida da planilha
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
    const googleAuth = await authenticate();
    const googleSheetsInstance = googleAuth.sheets;

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId: SPREADSHEET_ID,//ida da planilha
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
    const googleAuth = await authenticate();
    const googleSheetsInstance = googleAuth.sheets;

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId: SPREADSHEET_ID,
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
    const googleAuth = await authenticate();
    const googleSheetsInstance = googleAuth.sheets;

    const range = `${plan}!${cells}`;
    const request = {
        spreadsheetId: SPREADSHEET_ID,
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

async function crateNewTab(planName) {
    const googleAuth = await authenticate();
    const googleSheetsInstance = googleAuth.sheets;

    // Obter informações sobre as guias existentes
    const { data: sheetInfo } = await googleSheetsInstance.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
    });
    // Verificar se a guia ja existe
    const tabExists = sheetInfo.sheets.some(sheet => sheet.properties.title === planName);
    if (tabExists) {
        console.log(`Ja existe uma guia chamada '${planName}'. Verifique!`);
        return planName;
    }

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        resource: {
            requests: [
                {
                    addSheet: {
                        properties: {
                            title: planName,
                        },
                    },
                },
            ],
        },
    }

    try {
        // Adicionar nova guia à planilha existente
        const response = await googleSheetsInstance.spreadsheets.batchUpdate(request);
        console.log('Nova aba criada:', response);
        return planName;

    } catch (err) {
        console.error('Erro ao ler registros:', err.message);
        return null;
    }

}

async function deleteExistingTab(planName) {
    const googleAuth = await authenticate();
    const googleSheetsInstance = googleAuth.sheets;

    // Obter informações sobre as guias existentes
    const { data: sheetInfo } = await googleSheetsInstance.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
    });

    // Verificar se a guia existe
    const tabExists = sheetInfo.sheets.some(sheet => sheet.properties.title === planName);
    if (!tabExists) {
        console.log(`A guia '${planName}' não existe. Verifique!`);
        return;
    }

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        resource: {
            requests: [
                {
                    deleteSheet: {
                        sheetId: getSheetId(sheetInfo.sheets, planName),
                    },
                },
            ],
        },
    }

    try {
        // Deletar a guia existente
        const response = await googleSheetsInstance.spreadsheets.batchUpdate(request);
        console.log('Guia excluida com sucesso:', response);

    } catch (err) {
        console.error('Erro ao ler registros:', err.message);
    }

}

// Função auxiliar para obter o ID da guia pelo nome
function getSheetId(sheets, tabName) {
    const sheet = sheets.find(sheet => sheet.properties.title === tabName);
    return sheet ? sheet.properties.sheetId : null;
}

//--------------------------------------------------------------------------------------------------


module.exports = {
    createRange,
    clearRange,
    updateRange,
    getRange,
    crateNewTab,
    deleteExistingTab,
};
