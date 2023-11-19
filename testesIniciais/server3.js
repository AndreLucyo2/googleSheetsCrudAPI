const { google } = require('googleapis');
const credentials = require('../googleCredentials.json');

const spreadsheetId = '1Sc-oXexjYgWubDapmL43nEC1M5Q9mik9hTqoToYWb3Q';
const range = 'Sheet1!A2:C';

async function authenticate() {
  const auth = await new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

async function criarRegistro() {
  const sheets = await authenticate();

  const novoRegistro = {
    values: [['Novo Valor 1', 'Novo Valor 2', 'Novo Valor 3']],
  };

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: { values: [novoRegistro] },
    insertDataOption: 'INSERT_ROWS',
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Novo registro criado:', response.data);
  } catch (err) {
    console.error('Erro ao criar registro:', err.message);
  }
}

async function lerRegistros() {
  const sheets = await authenticate();

  const request = { spreadsheetId, range };

  try {
    const response = await sheets.spreadsheets.values.get(request);
    const valores = response.data.values;
    console.log('Registros lidos:', valores);
  } catch (err) {
    console.error('Erro ao ler registros:', err.message);
  }
}

async function atualizarRegistro() {
  const sheets = await authenticate();

  const atualizacao = {
    values: [['Valor Atualizado 1', 'Valor Atualizado 2', 'Valor Atualizado 3']],
  };

  const request = {
    spreadsheetId,
    range: 'Sheet1!A2:C2',
    valueInputOption: 'RAW',
    resource: { values: [atualizacao] },
  };

  try {
    const response = await sheets.spreadsheets.values.update(request);
    console.log('Registro atualizado:', response.data);
  } catch (err) {
    console.error('Erro ao atualizar registro:', err.message);
  }
}

async function excluirRegistro() {
  const sheets = await authenticate();

  const request = { spreadsheetId, range: 'Sheet1!A2:C2' };

  try {
    const response = await sheets.spreadsheets.values.clear(request);
    console.log('Registro excluído:', response.data);
  } catch (err) {
    console.error('Erro ao excluir registro:', err.message);
  }
}

// Exemplos de uso
criarRegistro();
// lerRegistros();
// atualizarRegistro();
// excluirRegistro();
