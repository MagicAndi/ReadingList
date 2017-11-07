"use strict";

var Books = (function () {

  var settings = {
    publicSpreadsheetUrl: "https://docs.google.com/spreadsheets/d/1ZTvkFasPlbF49jGnWqISvI_akMyL1tEGWPPTEmCc56E/pubhtml",
    numberOfRecentlyReadBooks: 5,
    numberOfRecommendedBooks: 5
  };

  function init() {
    Tabletop.init( { key: settings.publicSpreadsheetUrl,
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
    addBookTitleAndAuthor(currentlyReading, currentBook.Title, currentBook.Author );

    list.appendChild(currentlyReading);
    column.appendChild(list);
  }

  function addBookImage(element, bookDetails) {
    var image = document.createElement('img');
    var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/" + bookDetails.ISBN + ".jpg";
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', 'Book cover for ' + bookDetails.Title + ' by ' + bookDetails.Author);
    image.setAttribute('width', '60px');
    image.className = "left";
    element.appendChild(image);
  }

  function addBookTitleAndAuthor(element, title, author) {
    var text = document.createElement('p');
    var boldTitle = document.createElement('b');
    boldTitle.innerText = title;
    text.appendChild(boldTitle);
    text.innerHTML += " by " + author;
    element.appendChild(text);
  }

  function addDateRead(element, date) {
    var dateRead = document.createElement('p');
    dateRead.innerText = "Finished reading on " + date;
    element.appendChild(dateRead);
  }

  function addReview(element, myReview) {
    if(myReview != null) {
      var review = document.createElement('p');
      review.innerText = myReview;
      element.appendChild(review);
    }    
  }

  function addRating(element, rating) {
    var imageUrl = "https://sites.google.com/site/andyparkhill/home/book-images/";
    var altText = "";

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

    for (var i = 1; i <= settings.numberOfRecentlyReadBooks; i++){
      var element = document.createElement('li');
      addBookImage(element, records[i]);
      
      var div = document.createElement('div');
      div.className = "right";
      addBookTitleAndAuthor(div, records[i].Title, records[i].Author );
      addDateRead(div, records[i].DateRead);
      addReview(div, records[i].MyReview);
      addRating(div, records[i].MyRating);
      element.appendChild(div);  
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
    var highlyRatedBooks = records.slice(10).filter(function(i) {
      return i.MyRating === "5" && i.Classification === classification;
    });

    if(highlyRatedBooks.length > 0) {
      addHeader(parentElement, "h3", "Recommended " + classification);
      var list = document.createElement('ul');

      var booksToDisplay = settings.numberOfRecommendedBooks;
      if(booksToDisplay > highlyRatedBooks.length) {
        booksToDisplay = highlyRatedBooks.length;
      }
      else {
        // Get random values from array to display
        highlyRatedBooks = getRandomValuesFromArray(highlyRatedBooks, booksToDisplay);
      }
      
      for (var i = 0; i < booksToDisplay; i++){
        var element = document.createElement('li');  
        addBookImage(element, highlyRatedBooks[i], i);

        var div = document.createElement('div');
        div.className = "right";
        addBookTitleAndAuthor(div, highlyRatedBooks[i].Title, highlyRatedBooks[i].Author );
        addDateRead(div, highlyRatedBooks[i].DateRead);
        addReview(div, highlyRatedBooks[i].MyReview);
        addRating(div, highlyRatedBooks[i].MyRating); 
        element.appendChild(div);  
        list.appendChild(element);
      }

      parentElement.appendChild(list);
    } 
  }

  function showInfo(data, tabletop) {
    var content = document.getElementById('content');
    removeChildNodes(content);
    content.innerHTML = "";

    var records = data["Read Books"].elements;

    if(records.length > 0)
    {    
      addCurrentlyReading(content, records[0]);
      addRecentlyFinished(content, records);
      addRecommendedBooks(content, "Fiction", records);
      addRecommendedBooks(content, "Non-Fiction", records);
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

  // Declare public methods
  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', Books.init)