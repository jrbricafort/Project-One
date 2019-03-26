
// Symbol = the company/stock we're tracking

// AJAX call to census bureau...
// var symbol
// var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=2DVT0SBK107XQS8F';


// Onclick for search button
$('#search').on('click', function () {
  // Prevent refresh on submit
  event.preventDefault();
  // Capture user input and store to variable.
  var userInput = $('#user-input').val().trim();
  console.log(userInput);
  // Construct query URL using user input variable (This is a string literal)
  var queryURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${userInput}&interval=5min&apikey=2DVT0SBK107XQS8F`

  // Make API call...
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });

  var NYSEqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInput + "%20stock&api-key=JG2r3mqR1mTNBAa26W3HJBVTP1uSWGGg"

  // var NYSE_URL = (userInput + " stock");
  $.ajax({
    url: NYSEqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });
});