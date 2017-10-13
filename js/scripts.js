var publicSpreadsheetUrl = 
'https://docs.google.com/spreadsheets/d/1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E/pubhtml'
var spreadsheetKey = 
'1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E'

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   wanted: ["Read Books"], 
                   simpleSheet: false } )
}

function removeChildNodes(element) {
  if (element == undefined) {
      return;
  }

  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

function showInfo(data, tabletop) {
  alert('Successfully processed!')

  var retrievedData = document.getElementById('retrievedData');
  removeChildNodes(retrievedData);
  retrievedData.innerHTML = "";

  var count = document.createElement('p');
  var records = data["Read Books"].elements;
  var columns = data["Read Books"].columnNames;
  count.innerText = "Number of records returned: " + records.length;
  retrievedData.appendChild(count);
 
  var list = document.createElement('ul');

  for (var i = 0; i < columns.length; i++){
    var element = document.createElement('li');
    element.innerText = columns[i];
    list.appendChild(element);
  }

  retrievedData.appendChild(list);
}

window.addEventListener('DOMContentLoaded', init)