
// Symbol = the company/stock we're tracking

// AJAX call to census bureau...

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
  }).then(function (responseStock) {
    console.log(responseStock);

    var NYSEqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInputOne + "%20stock&api-key=JG2r3mqR1mTNBAa26W3HJBVTP1uSWGGg"

    $.ajax({
      url: NYSEqueryURL,
      method: "GET"
    }).then(function (responseNYT) {
      console.log(responseNYT);


      var newStockDiv = $("<div>").text(userInputOne).attr("class", "stockDiv");
      $("#searchOne").val("");

      $("#stock-container").append(newStockDiv);
      var newHeadlineDiv = $('<div>').attr('class', 'headline-div')
      $("#stock-container").append(newHeadlineDiv);
      $("#stock-container").append(responseNYT.response.docs[0].headline.main);
      $("#stock-container").append(newHeadlineDiv);
      $("#stock-container").append(responseNYT.response.docs[1].headline.main);
      $("#stock-container").append(newHeadlineDiv);
      $("#stock-container").append(responseNYT.response.docs[2].headline.main);
    });
  });
});