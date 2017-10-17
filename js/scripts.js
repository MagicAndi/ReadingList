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
  var retrievedData = document.getElementById('retrievedData');
  removeChildNodes(retrievedData);
  retrievedData.innerHTML = "";

  var table = document.createElement('table');
  table.id = "books";
  var tableHeader = document.createElement('thead');
  var tableBody = document.createElement('tbody');
  
  var headerRow = document.createElement('tr');
  var columns = data["Read Books"].columnNames; 

  var headerCell = document.createElement('th');
  headerCell.innerText = "Cover";
  headerRow.appendChild(headerCell);
  
  var headerCell = document.createElement('th');
  headerCell.innerText = "Title";
  headerRow.appendChild(headerCell);

  var headerCell = document.createElement('th');
  headerCell.innerText = "Author(s)";
  headerRow.appendChild(headerCell);
  
  var headerCell = document.createElement('th');
  headerCell.innerText = "Classification";
  headerRow.appendChild(headerCell);
  
  var headerCell = document.createElement('th');
  headerCell.innerText = "Tags";
  headerRow.appendChild(headerCell);  
  
  var headerCell = document.createElement('th');
  headerCell.innerText = "Date Read";
  headerRow.appendChild(headerCell);
  
  var headerCell = document.createElement('th');
  headerCell.innerText = "Rating";
  headerRow.appendChild(headerCell);

  var headerCell = document.createElement('th');
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  var records = data["Read Books"].elements;
  for (var i = 0; i < records.length; i++){
    var row = document.createElement('tr');

    var cell = document.createElement('td');
    var image = document.createElement('img');
    var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/" + records[i].ISBN + ".jpg"
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', 'Book cover for...');
    image.setAttribute('width', '50px');
    cell.appendChild(image);
    row.appendChild(cell);

    var cell = document.createElement('td');
    row.appendChild(cell);
    
    var cell = document.createElement('td');
    row.appendChild(cell);
    
    var cell = document.createElement('td');
    row.appendChild(cell);
    
    var cell = document.createElement('td');
    row.appendChild(cell);
    
    var cell = document.createElement('td');
    row.appendChild(cell);
    
    var cell = document.createElement('td');
    row.appendChild(cell);

    tableBody.appendChild(row);
  }
  
  table.appendChild(tableBody);
  retrievedData.appendChild(table);
}

window.addEventListener('DOMContentLoaded', init)