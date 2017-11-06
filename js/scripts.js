var publicSpreadsheetUrl = 
'https://docs.google.com/spreadsheets/d/1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E/pubhtml'
var spreadsheetKey = 
'1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E'

var numberOfRecentlyReadBooks = 10;
var numberOfRecommendedBooks = 6;

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

function buildLeftColumn(content, records) {
  var column = document.createElement('div');
  column.className = "leftColumn"

  addCurrentlyReading(column, records[0]);
  addRecentlyFinished(column, records);

  content.appendChild(column);
}

function addHeader(element, headerType, headerText) {
  var header = document.createElement(headerType);
  header.innerText = headerText;
  element.appendChild(header);
}

function addCurrentlyReading(column, currentBook) {
  addHeader(column, "h3", "Now Reading");

  var list = document.createElement('ul');
  var currentlyReading = document.createElement('li');

  addBookImage(currentlyReading, currentBook);  
  addBookTitle(currentlyReading, currentBook.Title);
  addAuthor(currentlyReading, currentBook.Author);

  list.appendChild(currentlyReading);
  column.appendChild(list);
}

function addBookImage(element, bookDetails) {
  var image = document.createElement('img');
  var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/" + bookDetails.ISBN + ".jpg";
  image.setAttribute('src', imageUrl);
  image.setAttribute('alt', 'Book cover for ' + bookDetails.Title + ' by ' + bookDetails.Author);
  image.setAttribute('width', '50px');
  element.appendChild(image);
}

function addBookTitle(element, title) {
  var bookTitle = document.createElement('p');
  bookTitle.innerText = title;
  bookTitle.style.fontSize = "12pt";
  bookTitle.style.fontWeight = "Bold";
  element.appendChild(bookTitle);
}

function addAuthor(element, author) {
  var authorDetails = document.createElement('p');
  authorDetails.innerText = "by " + author;
  element.appendChild(authorDetails);
}

function addDateRead(element, date, review) {
  var dateRead = document.createElement('p');
  dateRead.innerText = "Finished reading on " + date;

  if(review) {
    dateRead.innerText += ". " + review;
  }

  element.appendChild(dateRead);
}

function addRating(element, rating) {
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
}

function addRecentlyFinished(column, records) {
  addHeader(column, "h3", "Recently Finished");
  var list = document.createElement('ul');

  for (var i = 1; i <= numberOfRecentlyReadBooks; i++){
    var element = document.createElement('li');

    addBookImage(element, records[i]);
    addBookTitle(element, records[i].Title);
    addAuthor(element, records[i].Author);
    addDateRead(element, records[i].DateRead, records[i].MyReview);
    addRating(element, records[i].MyRating);          

    list.appendChild(element);
  }

  column.appendChild(list);
}

function getRandomValuesFromArray(array, count){
  var result = [];
  var _tmp = array.slice();
  for(var i = 0; i < count; i++){
    var index = Math.ceil(Math.random() * 10) % _tmp.length;
    result.push(_tmp.splice(index, 1)[0]);
  }
  return result;
}

function addRecommendedBooks(parentElement, classification, records) {
  var highlyRatedBooks = records.filter(function(i) {
    return i.MyRating === "5" && i.Classification === classification;
  });

  if(highlyRatedBooks.length > 0) {
    addHeader(parentElement, "h4", classification);
    var list = document.createElement('ul');

    var booksToDisplay = numberOfRecommendedBooks;
    if(numberOfRecommendedBooks > highlyRatedBooks.length) {
      booksToDisplay = highlyRatedBooks.length;
    }
    else {
      // Get random values from array to display
      // highlyRatedBooks = getRandomValuesFromArray(highlyRatedBooks, numberOfRecommendedBooks);
    }
    
    for (var i = 0; i < booksToDisplay; i++){
      var element = document.createElement('li');
  
      addBookImage(element, highlyRatedBooks[i], i);
      addBookTitle(element, highlyRatedBooks[i].Title);
      addAuthor(element, highlyRatedBooks[i].Author);
      addDateRead(element, highlyRatedBooks[i].DateRead);
      addRating(element, highlyRatedBooks[i].MyRating);          
  
      list.appendChild(element);
    }

    parentElement.appendChild(list);
  } 
}

function buildRightColumn(content, records) {
  var column = document.createElement('div');
  column.className = "rightColumn"
  
  addHeader(column, "h3", "Highly Recommended", records);
  addRecommendedBooks(column, "Fiction", records);
  addRecommendedBooks(column, "Non-Fiction", records);

  content.appendChild(column);
}

function showInfo(data, tabletop) {
  var content = document.getElementById('content');
  removeChildNodes(content);
  content.innerHTML = "";

  var records = data["Read Books"].elements;

  if(records.length > 0)
  {    
    buildLeftColumn(content, records);
    buildRightColumn(content, records);
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