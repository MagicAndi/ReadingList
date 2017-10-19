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
  var content = document.getElementById('content');
  removeChildNodes(content);
  content.innerHTML = "";

  var records = data["Read Books"].elements;

  if(records.length > 0)
  {
    // Currently reading
    var header = document.createElement('h3');
    header.innerText = "Now Reading";
    content.appendChild(header);
    
    var currentBook = records[0];
    var paragraph = document.createElement('p');
    paragraph.innerText = "I'm currently reading " + currentBook.Title + " by " + currentBook.Author + ".";
    content.appendChild(paragraph);

    // Recently finished
    var header = document.createElement('h3');
    header.innerText = "Recently Finished";
    content.appendChild(header);
    var list = document.createElement('ul');

    for (var i = 1; i <= 10; i++){
      var element = document.createElement('li');
      
      // Add image
      // Add header
      // Add details
      
      element.innerText = records[i].Title + " by " + records[i].Author;
      list.appendChild(element);

      <img src="http://lorempixum.com/100/100/nature/1" >
      <h3>The Grasslands</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod ultrices ante, ac laoreet nulla vestibulum adipiscing. Nam quis justo in augue auctor imperdiet.</p>
    </li>
    }

    content.appendChild(list);
  }
  else
  {
    // Give an error message...
  }

  
  content.appendChild(table);
}

window.addEventListener('DOMContentLoaded', init)