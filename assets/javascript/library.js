// var GphApiClient = require('giphy-js-sdk-core')
// client = GphApiClient("caBX4qhQ77HZfPBVdMDJqKUgRojKGpZh")

$('#add-button').on('click', function(event){
    event.preventDefault();
    
    // buttons.push(buttonTitle);
    putTheButtonDown();
});



var putTheButtonDown = function(buttonTitle) {
    var buttonTitle = $("#keyword-input").val().trim();
    var button = $('<button>');
    button.addClass('add-gifs');
    button.attr('data-name', buttonTitle);
    button.text(buttonTitle);
    $('#buttons-view').append(button);

}

var keyword,rating;
var displayNum = 15;


// var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=caBX4qhQ77HZfPBVdMDJqKUgRojKGpZh&q=" + keyword + "&limit=" + displayNum + "&offset=0&rating=" + rating + "&lang=en";

var displayGifs = function() {
    var keyword = $(this).attr('data-name');
    $('#gif-display').empty();
    // var rating = 'Y';
    // var displayNum = 15;

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=caBX4qhQ77HZfPBVdMDJqKUgRojKGpZh&q=" + keyword + "&limit=15&offset=0&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data[0]);
        console.log(response.data[0].images.fixed_height_still.url);
        console.log(response.data[0].images.preview_gif.url);

        for (i=0; i < response.data.length; i++) {
            var imgUrl = response.data[i].images.fixed_height_still.url;
            var animateUrl = response.data[i].images.preview_gif.url;
            var animateURL = response.data[i].images.downsized_medium.url;
            console.log(animateURL);
            rating = response.data[i].rating;
            var img = $('<img>').attr({
                src: imgUrl,
                data_still: imgUrl,
                data_animate: animateUrl,
                data_animate2: animateURL,
                data_state: 'still',
                rating: rating
            });
            var imgWrapper = $('<div>', {class: "img-wrapper"});
            imgWrapper.attr( {'id': 'img' + i })
            img.addClass('gifs')
            var rateLabel = $('<p>').text('rating: ' + rating)
            $('#gif-display').append(imgWrapper);
            $('#img' + i).append(img);
            $('#img' + i).append(rateLabel);
        }
    });
    //     var imgUrl = response.data[0].images.fixed_height_still.url;
    //     rating = response.data[0].rating;
    //     var img = $('<img>').attr({
    //         src: imgUrl,
    //         rating: rating
    //     });
    //     var imgWrapper = $('<div class="img-wrapper" id="img1">')
    //     img.addClass('gifs')
    //     var rateLabel = $('<span>').text('rating: ' + rating)
    //     $('#gif-display').append(imgWrapper);
    //     $('#img1').append(img) ;
    //     $('#img1').append(rateLabel);
    // });
};    


$(document).on("click", ".add-gifs", displayGifs);

$(document).on("click", ".gifs", function() {
    console.log('does it work?')
    var state = $(this).attr("data_state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data_animate2"));
        $(this).attr("data_state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data_still"));
        $(this).attr("data_state", "still");
    }
});

// $(".gifs").on('click',function() {
//     console.log('does it work?')
//     var state = $(this).attr("data_state");
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data_animate"));
//         $(this).attr("data_state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data_still"));
//         $(this).attr("data_state", "still");
//     }
// });

