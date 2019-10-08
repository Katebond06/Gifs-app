console.log("checking");
//there are multiple buttons with animals
var topics = [
  "dog",
  "bird",
  "tiger",
  "bear",
  "zebra",
  "cat",
  "leopard",
  "wolf",
  "elephant",
  "monkey",
  "giraffe",
  "kangaroo",
  "panda",
  "deer",
  "lamb",
  "sheep",
  "goose",
  "cow",
  "walrus",
  "dinosaur",
  "seal"
];

//use 'this' for a computer to recognize what button has been pressed, since we have 11 buttons with animals.
function displayGif() {
  // look at the button id
  var animal = $(this).attr("data-animal");
  // url to know where gifs come from and your individual API key
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=QH6Ly6kReoNnkWcFbtkGBVnA085kTPLG&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);
      animalDiv.append(p);

      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_small.url);
      animalImage.attr("data-state", "animate");
      animalImage.attr(
        "data-still",
        results[i].images.fixed_height_small_still.url
      );
      animalImage.attr(
        "data-animated",
        results[i].images.fixed_height_small.url
      );
      $(animalImage).addClass("gif");
      animalDiv.append(animalImage);

      $("#gifs-appear-here").prepend(animalDiv);
    }
  });
}

// Function for displaying movie data
function renderButtons() {
  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repebuttons)
  $("#buttons-view").empty();
  // Looping through animals, using var results, since we are going to get results, backend gives you by default 25 limit.
  for (var i = 0; i < topics.length; i++) {
    // jQuery dynamically, without messing with html, creats a new div, inside a new p so we would se a rating for each gif.
    var a = $("<button>");
    a.addClass("animal-btn");
    a.attr("data-animal", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var animal = $("#gif-input")
    .val()
    .trim();
  topics.push(animal);
  renderButtons();
});

$(document).on("click", ".animal-btn", displayGif);
renderButtons();

// Pausing-gifs

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
