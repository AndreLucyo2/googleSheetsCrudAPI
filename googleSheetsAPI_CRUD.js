const googleSheetsAPI = require('./googleSheetsAPI.js');

// Exemplos de uso

//----------------------------------------------
googleSheetsAPI.clearRange("Plan1", "A1:M1");


//----------------------------------------------
const valores = [
    ["AAA", "BBB", "CCC"],
    ["DDD", "EEE", "FFF"],
    ["GGG", "HHH", "JJJ"],
];
googleSheetsAPI.createRange(valores, "Plan1", "A1");



//----------------------------------------------
const valores1 = [
    ["888", "HHH", "KKK"],
    ["LLL", "PPP", "ZZZ"],
    ["MMM", "UUU", "YYY"],
];
googleSheetsAPI.updateRange(valores1, "Plan1", "A1");


//----------------------------------------------
googleSheetsAPI.getRange("Plan1", "A:H");