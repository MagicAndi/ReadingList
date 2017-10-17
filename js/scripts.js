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
  headerCell.setAttribute('width', '90px');
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

    // Cover image
    var cell = document.createElement('td');
    var image = document.createElement('img');
    var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/" + records[i].ISBN + ".jpg";
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', 'Book cover for ' + records[i].Title + ' by ' + records[i].Author + ' (ISBN: ' + records[i].ISBN + ')');
    image.setAttribute('width', '80px');
    cell.appendChild(image);
    row.appendChild(cell);

    // Title
    var cell = document.createElement('td');
    cell.innerText = records[i].Title;
    row.appendChild(cell);
    
    // Author
    var cell = document.createElement('td');
    cell.innerText = records[i].Author;
    row.appendChild(cell);
    
    // Classification
    var cell = document.createElement('td');
    cell.innerText = records[i].Classification;
    row.appendChild(cell);
    
    // Tags
    var cell = document.createElement('td');
    cell.innerText = records[i].Tags;
    row.appendChild(cell);
    
    // Date Read
    var cell = document.createElement('td');
    var dateRead = records[i].DateRead;
    console.log("Date read: " + dateRead);
    console.log("Date read length: " + dateRead.length);

    if(dateRead == null || dateRead.length === 0)
    {
      cell.innerText = "Currently reading";
    }
    else
    {
      cell.innerText = dateRead;
    }
    row.appendChild(cell);
    
    // Rating
    var cell = document.createElement('td');
    var rating = records[i].MyRating;
    imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/";
    altText = "";

    switch (rating) {
      case '1':
          imageUrl += "1_stars.png";
          altText += "Rated as 1 out of 5 stars";
          break;
      case '2':
          imageUrl += "2_stars.png";
          altText += "Rated as 2 out of 5 stars";
          break;
      case '3':
          imageUrl += "3_stars.png";
          altText += "Rated as 3 out of 5 stars";
          break;
      case '4':
          imageUrl += "4_stars.png";
          altText += "Rated as 4 out of 5 stars";
          break;
      case '5':
          imageUrl += "5_stars.png";
          altText += "Rated as 5 out of 5 stars";
          break;
      default:
        imageUrl = "";
        cell.innerText = "No rating";
        console.log('Rating not set!');
    }

    if(imageUrl.length > 0) {
      var image = document.createElement('img');
      image.setAttribute('src', imageUrl);
      image.setAttribute('alt', altText);
      image.setAttribute('width', '60px');
      cell.appendChild(image);
    }

    row.appendChild(cell);

    tableBody.appendChild(row);
  }
  
  table.appendChild(tableBody);
  retrievedData.appendChild(table);
}

window.addEventListener('DOMContentLoaded', init)