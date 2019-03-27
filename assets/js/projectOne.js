
// Symbol = the company/stock we're tracking

// AJAX call to census bureau...
// var symbol
// var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=2DVT0SBK107XQS8F';


////////////////////////// First API Call for top search bar //////////////////////////
$('#search-One').on('click', function () {
  // Prevent refresh on submit
  event.preventDefault();
  // Capture user input and store to variable.
  var userInputOne = $('#searchOne').val().trim();
  console.log(userInputOne);
  // Construct query URL using user input variable (This is a string literal)
  var queryURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${userInputOne}&interval=5min&apikey=2DVT0SBK107XQS8F`

  // Make API call...
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  var NYSEqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInputOne + "%20stock&api-key=JG2r3mqR1mTNBAa26W3HJBVTP1uSWGGg"

  // var NYSE_URL = (userInputOne + " stock");
  $.ajax({
    url: NYSEqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  $("#stockSearchOne").text(userInputOne);
  $("#stockSearchOne").val("");
});


////////////////////////// Second API Call for top search bar //////////////////////////
$('#search-Two').on('click', function () {
  // Prevent refresh on submit
  event.preventDefault();
  // Capture user input and store to variable.
  var userInputTwo = $('#searchTwo').val().trim();
  console.log(userInputTwo);
  // Construct query URL using user input variable (This is a string literal)
  var queryURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${userInputTwo}&interval=5min&apikey=2DVT0SBK107XQS8F`

  // Make API call...
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  var NYSEqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInputTwo + "%20stock&api-key=JG2r3mqR1mTNBAa26W3HJBVTP1uSWGGg"

  // var NYSE_URL = (userInputOne + " stock");
  $.ajax({
    url: NYSEqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  $("#stockSearchTwo").text(userInputTwo);
  $("#stockSearchTwo").val("");

});

////////////////////////// Third API Call for top search bar //////////////////////////
$('#search-Three').on('click', function () {
  // Prevent refresh on submit
  event.preventDefault();
  // Capture user input and store to variable.
  var userInputThree = $('#searchThree').val().trim();
  console.log(userInputThree);
  // Construct query URL using user input variable (This is a string literal)
  var queryURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${userInputThree}&interval=5min&apikey=2DVT0SBK107XQS8F`

  // Make API call...
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  var NYSEqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInputThree + "%20stock&api-key=JG2r3mqR1mTNBAa26W3HJBVTP1uSWGGg"

  // var NYSE_URL = (userInputThree + " stock");
  $.ajax({
    url: NYSEqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  $("#stockSearchThree").text(userInputThree);
  $("#stockSearchThree").val("");
});