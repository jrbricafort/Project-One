// Initialize Firebase
var config = {
  apiKey: "AIzaSyCrNQlrf_PNZUzB0q_LAs4XsRXIF8KMRTY",
  authDomain: "project-1-4069a.firebaseapp.com",
  databaseURL: "https://project-1-4069a.firebaseio.com",
  projectId: "project-1-4069a",
  storageBucket: "project-1-4069a.appspot.com",
  messagingSenderId: "121909185590"
};

firebase.initializeApp(config);

var database = firebase.database();
var userInputOne;
// Symbol = the company/stock we're tracking

// Define function to get stocks
function getStockValues() {

  var convertedUserInput = userInputOne.toUpperCase()
  console.log(convertedUserInput);



  // Create new canvas element and append to chart-div
  var newCanvas = $('<canvas>');
  newCanvas.attr('id', 'myChart').attr('style', 'max-width: 600px; max-height: 300px;')
  $('#chart-div').append(newCanvas);


  // Construct query URL using user input variable (This is a string literal)
  var queryURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${userInputOne}&interval=5min&apikey=2DVT0SBK107XQS8F`

  // Make Stock API call...
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (responseStock) {
    console.log(responseStock);

    // Create new stock header div 
    // IF WE'RE ONLY GOING TO SHOW 1 CHART AT A TIME, CREATE THIS EMPTY DIV IN HTML
    // var stockHeaderDiv = $('<div>');
    // stockHeaderDiv.attr('class', 'col-12');
    // stockHeaderDiv.attr('class', 'stock-title-div');
    // stockHeaderDiv.text(convertedUserInput + " Stock Values and Related News");
    // $('.stock-container').prepend(stockHeaderDiv);
    $('.stock-title-div').html("<h3>" + convertedUserInput + " Stock Value and Related News</h3>")

    // data array is built using values returned from stock API. It is passed into chart.js
    var dataArr = [];
    console.log(responseStock['Time Series (5min)']);
    // Time series refers to the list of timestamps (every 5 min) that comes back from the API.
    var timeSeries = responseStock['Time Series (5min)'];

    // timeStampInfo refers to the object that returns for that specific time. It contains the actual values we use.
    var timeStampInfo = Object.values(timeSeries)[0];
    console.log(timeStampInfo);
    console.log(Object.values(timeStampInfo)[0]);

    // openValue refers to the value for the Open key in the timeStampInfo object.
    // This should be a number, and will be added to the data array so it can display in the chart.
    var openValue = Object.values(timeStampInfo)[0];


    for (var stockValue in timeSeries) {
      // Add each 'open' value in stockValue object to the dataArr array.
      // Unshift is used instead of push. Otherwise, the chart displays backwards.
      dataArr.unshift(timeSeries[stockValue]['1. open']);
    }
    console.log(dataArr);

    var ctx = document.getElementById('myChart').getContext('2d');

    // Chart.defaults.global.<default options go here…>

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [{
          label: convertedUserInput + ' Market Value',
          data: dataArr,
          backgroundColor: [
            'rgba(0, 255, 132, 0.2)',
          ],
          borderColor: [
            'rgba(0, 200, 132, 1)',
          ],
          borderWidth: 3
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });

    // Second call to Alpha Vantage Starts Here...
    var nameConverterURL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + userInputOne + '&apikey=2DVT0SBK107XQS8F'
    var convertedCompanyName;

    $.ajax({
      url: nameConverterURL,
      method: "GET"
    }).then(function (response) {
      console.log(response.bestMatches[0]['2. name']);
      convertedCompanyName = response.bestMatches[0]['2. name'];


      // NYT Call starts here...
      var NYTqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + convertedCompanyName + "%20stock&api-key=JG2r3mqR1mTNBAa26W3HJBVTP1uSWGGg"
      // NYT API Call...
      $.ajax({
        url: NYTqueryURL,
        method: "GET"
      }).then(function (responseNYT) {
        console.log(responseNYT);
        console.log(responseNYT.response.docs[0].web_url);

        for (i = 0; i < 3; i++) {
          // Create headlineDiv, which will hold the headline
          var headlineDiv = $('<div>').attr('class', 'headline-div');
          // Create new <a> element. Give it an href to the full article on NYT website.
          var articleLink = $('<a>').attr('href', responseNYT.response.docs[i].web_url);
          // Set article link to open in a new tab
          articleLink.attr('target', '_blank');
          // Add the headline text to the article link
          articleLink.html("<h3>" + responseNYT.response.docs[i].headline.main + "</h3>")
          // Append the article link to the headline div
          $(headlineDiv).append(articleLink);
          // Append the headline div to the news div
          $('#news-div').append(headlineDiv);
          console.log(responseNYT.response.docs[i].snippet);
          // Create div to hold the article snippet
          var snippetDiv = $('<div>').attr('class', 'snippet-div');
          // Add snippet text to a new <p> element inside snippet div.
          snippetDiv.html('<p>' + responseNYT.response.docs[i].snippet + '</p>');
          // Append snippetDiv to the news div
          $('#news-div').append(snippetDiv);
        }
      });
    });
  });


  // Empty search box text on search
  $('#searchOne').val('');
}




////////////////////////// First API Call for top search bar //////////////////////////
$('#search-One').on('click', function () {
  // Prevent refresh on submit
  event.preventDefault();
  $('#chart-div').empty();
  $('#news-div').empty();

  // Capture user input and store to variable.
  userInputOne = $('#searchOne').val().trim();
  console.log(userInputOne);

  // User Input Validation
  if (userInputOne === '') {
    return false;
  } else {
    getStockValues();
  }
  var convertedUserInput = userInputOne.toUpperCase()
  var newSearch = {
    fbSearchValue: convertedUserInput,
  };
  console.log('------------------------')
  console.log(newSearch)
  console.log('------------------------')

  database.ref('/searches').push(newSearch);


});
database.ref('/searches').limitToLast(5).once("value", function (snapshot) {
  snapshot.forEach((child) => {
    console.log(child.val().fbSearchValue)
    var newSearchButton = $('<button>');
    newSearchButton.text(child.val().fbSearchValue);
    $('#search-container').append(newSearchButton);
    newSearchButton.on('click', function () {
      userInputOne = $(this).text();
      console.log(userInputOne);
      $('#chart-div').empty();
      $('#news-div').empty();
      getStockValues();
    })
  });
  // for(searchTerm in snapshot.val()) {
  //   console.log(searchTerm)
  // }
  // console.log(snapshot.val())
  // console.log(snapshot.val()[0])

})

$(".contactSubmit").on('click', function (even) {
  // event.preventDefault();
  var contactName = $(".contactName").val();

  var contactEmail = $(".contactEmail").val();

  var contactMessage = $(".contactMessage").val();

  database.ref("/contact").push({

    contactName: contactName,
    contactEmail: contactEmail,
    contactMessage: contactMessage
  })

  $(".contactName").empty();
  $(".contactEmail").empty();
  $(".contactMessage").empty();

});