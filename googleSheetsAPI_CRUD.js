const googleSheetsAPI = require('./googleSheetsAPI.js');


//********************************************************************
// EXEMPLOS DE USO:
//********************************************************************
//----------------------------------------------
//googleSheetsAPI.crateNewTab("NOVA_PLAN-07");
//console.log(googleSheetsAPI.crateNewTab("NOVA_PLAN-06"));

//----------------------------------------------
// async function populaDados() {
//     try {
//         // Criação da guia e espera pela conclusão para a proxima ação:
//         const plan = await googleSheetsAPI.crateNewTab("Nova Plan 01");

//         const valoresB = [
//             ["AAA", "BBB", "CCC"],
//             ["DDD", "EEE", "FFF"],
//             ["GGG", "HHH", "JJJ"],
//         ];
//         googleSheetsAPI.createRange(valoresB, plan, "A1");

//         console.error("Sucesso! Guia criada e populada!");

//     } catch (error) {
//         console.error('Erro:', error.message);
//     }
// }
// populaDados();


//----------------------------------------------
googleSheetsAPI.crateNewTab("Sheet1");


//----------------------------------------------
//googleSheetsAPI.deleteExistingTab("NOVA_PLAN-07");

//----------------------------------------------
const valoresA = [
    ["AAA", "BBB", "CCC"],
    ["DDD", "EEE", "FFF"],
    ["GGG", "HHH", "JJJ"],
];
//googleSheetsAPI.createRange(valoresA, "Plan1", "A1");


//----------------------------------------------
//googleSheetsAPI.clearRange("Plan1", "A1:M1");

//----------------------------------------------
const valoresC = [
    ["888", "HHH", "KKK"],
    ["LLL", "PPP", "ZZZ"],
    ["MMM", "UUU", "YYY"],
];
//googleSheetsAPI.updateRange(valoresC, "Plan1", "A1");


//----------------------------------------------
//googleSheetsAPI.getRange("Plan1", "A:H");