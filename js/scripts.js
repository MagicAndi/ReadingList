var publicSpreadsheetUrl = 
'https://docs.google.com/spreadsheets/d/1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E/pubhtml'
var spreadsheetKey = 
'1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E'

var numberOfRecentlyReadBooks = 10;


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

function BuildLeftColumn(content, records) {
  var column = document.createElement('div');
  column.className = "leftColumn"

  AddCurrentlyReading(column, records[0]);
  AddRecentlyFinished(column, records);

  content.appendChild(column);
}

function AddCurrentlyReading(column, currentBook) {
  var header = document.createElement('h3');
  header.innerText = "Now Reading";
  column.appendChild(header);

  var list = document.createElement('ul');
  var currentlyReading = document.createElement('li');

  var bookImage = document.createElement('img');
  var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/" + currentBook.ISBN + ".jpg";
  bookImage.setAttribute('src', imageUrl);
  bookImage.setAttribute('alt', 'Book cover for ' + currentBook.Title + ' by ' + currentBook.Author);
  bookImage.setAttribute('width', '50px');
  currentlyReading.appendChild(bookImage);
  
  var bookTitle = document.createElement('p');
  bookTitle.innerText = currentBook.Title
  bookTitle.style.fontSize = "12pt";
  bookTitle.style.fontWeight = "Bold";
  currentlyReading.appendChild(bookTitle);

  var authorDetails = document.createElement('p');
  authorDetails.innerText = "by " + currentBook.Author;
  currentlyReading.appendChild(authorDetails);

  list.appendChild(currentlyReading);
  column.appendChild(list);
}

function AddRecentlyFinished(column, records) {
  var header = document.createElement('h3');
  header.innerText = "Recently Finished";
  column.appendChild(header);

  var list = document.createElement('ul');

  for (var i = 1; i <= 10; i++){
    var element = document.createElement('li');
    
    var bookImage = document.createElement('img');
    var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/" + records[i].ISBN + ".jpg";
    bookImage.setAttribute('src', imageUrl);
    bookImage.setAttribute('alt', 'Book cover for ' + records[i].Title + ' by ' + records[i].Author + ' (ISBN: ' + records[i].ISBN + ')');
    bookImage.setAttribute('width', '50px');
    element.appendChild(bookImage);
    
    var bookTitle = document.createElement('p');
    bookTitle.innerText = records[i].Title
    bookTitle.style.fontSize = "12pt";
    bookTitle.style.fontWeight = "Bold";
    element.appendChild(bookTitle);

    var authorDetails = document.createElement('p');
    authorDetails.innerText = "by " + records[i].Author;
    element.appendChild(authorDetails);
    
    var dateRead = document.createElement('p');
    dateRead.innerText = "Finished reading on " + records[i].DateRead;
    element.appendChild(dateRead);

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
      var ratingImage = document.createElement('img');
      ratingImage.setAttribute('src', imageUrl);
      ratingImage.setAttribute('alt', altText);
      ratingImage.setAttribute('width', '60px');
      element.appendChild(ratingImage);
    }
          
    list.appendChild(element);
  }

  column.appendChild(list);
}

function BuildRightColumn(content, records) {
  var column = document.createElement('div');
  column.className = "rightColumn"

  content.appendChild(column);
}

function showInfo(data, tabletop) {
  var content = document.getElementById('content');
  removeChildNodes(content);
  content.innerHTML = "";

  var records = data["Read Books"].elements;

  if(records.length > 0)
  {    
    BuildLeftColumn(content, records);
    BuildRightColumn(content, records);
  }
  else
  {
    var link = document.createElement("a");
    link.href = "http://www.andyparkhill.co.uk/p/contact-me.html";
    link.target = '_blank';
    link.innerHTML = "Contact form";

    var error = document.createElement('p');
    error.innerHTML = "Apologies, I'm unable to retrieve the books data. If the error continues, please use the ";
    error.appendChild(link);
    error.innerHTML += " to let me know. Thanks!";    
    content.appendChild(error);
  }
}

window.addEventListener('DOMContentLoaded', init)