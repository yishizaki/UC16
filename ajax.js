function findShow(seasonId, episodeId) {
    // First get the zip code from the HTML textbox
    var season = document.getElementById(seasonId).value;
    var episode = document.getElementById(episodeId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                displaySummary(this.responseText);
            }
            else if (this.status === 404) {
                // No postal code found
                displaySummary("none");
            }
            else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        }
        else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "http://api.tvmaze.com/shows/176/episodebynumber?season=" + season + "&number=" + episode;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displaySummary(data) {
    var summary = JSON.parse(data);
    if (data === "none") {
        document.getElementById("summary").className = "alert alert-warning";
        document.getElementById("summary").innerHTML = "There is no episode by the numbers you have chosen."
    }
    else {
        document.getElementById("summary").className = "alert alert-success";
        document.getElementById("image").src = summary.image.medium;
        document.getElementById("summary").innerHTML = summary.name + summary.summary;
    }
}
