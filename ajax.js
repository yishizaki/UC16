/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findShow(showId) {
    // First get the zip code from the HTML textbox
    var show = document.getElementById(showId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayPlace(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayCast('{ "country" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "http://api.tvmaze.com/shows/:id/cast" + show;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayCast(data){
    var cast = JSON.parse(data);
    if(cast.name === "none") {
        document.getElementById("cast").className = "alert alert-warning";
        document.getElementById("cast").innerHTML = "No cast matches the show."
    } else {
        document.getElementById("cast").className = "alert alert-success";
         document.getElementById("cast").innerHTML = cast.name +
        ", " +
        cast.image +
        ", " +
       cast.character;
    }
}
