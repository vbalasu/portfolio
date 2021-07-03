import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { HyperFormula } from 'hyperformula';
import { readRemoteFile, jsonToCSV } from 'react-papaparse';
window.jsonToCSV = jsonToCSV;

async function fetchData(url) {
  var row;
  let response = await fetch(url);
  let data = await response.json();
  let symbol_and_current_price = []
  for(row of data) symbol_and_current_price.push({'symbol':row['symbol'],'current_price':row['current_price']})
  return symbol_and_current_price
}
async function get_markets() {
  return await fetchData('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
}
function markets_to_array(markets) {
  var result = []
  var headings = Object.keys(markets[0])
  result.push(headings)
  for(var m of markets) {
      var row = Object.values(m)
      result.push(row)
  }
  return result
}
function toJson (url) {
return new Promise((resolve, reject) => {
readRemoteFile(url, {
  download: true,
  complete (results, file) {
    resolve(results.data)
  },
  error (err, url) {
    reject(err)
  }
})
})
}
async function load_csv(user, cid) {
var data = await toJson(`https://portfolio-api.cloudmatica.com/get/${user}/${cid}`)
return data
}

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
Handsontable.renderers.TextRenderer.apply(this, arguments);
td.style.fontWeight = 'bold';
td.style.color = 'green';
td.style.background = '#CEC';
}

async function main(user, cid, readOnly = false) {
var hyperformulaInstance = HyperFormula.buildEmpty({licenseKey: 'non-commercial-and-evaluation'});

window.portfolio = await load_csv(user, cid)

window.markets = await get_markets()
window.markets_array = markets_to_array(window.markets)
var data = window.markets_array  //.slice(1)

var container2 = document.getElementById('hot2');
var hot2 = new Handsontable(container2, {
  readOnly: true,   // lookup sheet is always read only
  data: data,
  rowHeaders: true,
  colHeaders: false,
  filters: true,
  dropdownMenu: true,
    formulas: {
    engine: hyperformulaInstance,
    sheetName: 'coingecko'
  },
  cells: function (row, col) {
    var cellProperties = {};
    if (row === 0) {
      cellProperties.renderer = firstRowRenderer; // uses function directly
    }
    return cellProperties;
  },
  licenseKey: 'non-commercial-and-evaluation'
});

var container1 = document.getElementById('hot1');
var hot1 = new Handsontable(container1, {
  data: window.portfolio,  //.slice(1),
  readOnly: readOnly,  // based on parameter
  rowHeaders: true,
  colHeaders: false,
  height: 500,
  overflow: 'hidden',
  filters: true,
  contextMenu: true,
  dropdownMenu: true,
    formulas: {
    engine: hyperformulaInstance,
    sheetName: 'portfolio'
  },
  columns: [
    {type: 'text'},
    {type: 'text'},
    {type: 'numeric'},
    {type: 'numeric'},
    {type: 'numeric',
      numericFormat: {
        pattern: '0,0.00',
        culture: 'en-US' // this is the default culture, set up for USD
      }}
    ],
  cells: function (row, col) {
    var cellProperties = {};
    if (row === 0) {
      cellProperties.renderer = firstRowRenderer; // uses function directly
    }
    return cellProperties;
  },
  licenseKey: 'non-commercial-and-evaluation'
});
window.hot1 = hot1;
window.hot2 = hot2;


}

export { fetchData, get_markets, toJson, load_csv, firstRowRenderer, main };