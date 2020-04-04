function search(word, startYear, endYear, records) {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + word + "&api-key=KHGB4l2Anfnl8ALu4rztjZA8pGg1rbM8";
    var usingDates = false;

    if (startYear !== null && startYear.length > 0) {
        queryURL = queryURL.concat("&begin_date=" + startYear + "0101");
        usingDates = true;
    }

    if (endYear != null && endYear.length > 0) {
        queryURL = queryURL.concat("&end_date=" + endYear + "1231");
        usingDates = true;
    }

    if (usingDates) {
        queryURL = queryURL.concat("&facet_fields=source&facet=true");
    }

    $.ajax({
        url:queryURL,
        method: "Get"
    }).then(function(resp){
        $("#article-list").empty();

        console.log(resp);
        if(records > 1){
            for(var i = 0; i < Number(records); i++){
                var entry = $("<div>").attr("class", "entry");
                var abstract = $("<h3>").attr("class", "abstract");
                var article = $("<p>").attr("class", "article");
                var date = $("<p>").attr("class", "date");

                abstract.html(resp.response.docs[i].abstract);
                article.html(resp.response.docs[i].lead_paragraph);
                date.text(resp.response.docs[i].pub_date);

                entry.append(abstract);
                entry.append(article);
                entry.append(date);

                $("#article-list").append(entry);
                console.log(resp.response.docs[i].abstract);
            }
        } else {
            var entry = $("<div>").attr("class", "entry");
            var abstract = $("<h3>").attr("class", "abstract");
            var article = $("<p>").attr("class", "article");
            var date = $("<p>").attr("class", "date");

            abstract.html(resp.response.docs[0].abstract);
            article.html(resp.response.docs[0].lead_paragraph);
            date.text(resp.response.docs[0].pub_date);

            entry.append(abstract);
            entry.append(article);
            entry.append(date);

            $("#article-list").append(entry);

            console.log(resp.response.docs[0].abstract);
        }
    });

}


$("#search-button").click(function(event){
    event.preventDefault();


    var word = $("#search-term-input").val().trim();
    var startYear = $("#start-year-input").val().trim();
    var endYear = $("#end-year-input").val().trim();
    var records = $("#record-number-input").val();

    console.log("word " + word + " start year " + startYear + " end year " + endYear + " records " + records );

    if(word !== null && word !== ""){
        search(word, startYear.trim, startYear, records);
    }else{
        alert("Input something to search for");
    }
});

$("#clear-results-button").click(function(){
    $("#article-list").empty();
})
 


///articlesearch.json?q={query}&fq={filter
///fq=source:("The New York Times")  

//pub_year:2010

//q=obama&facet_fields=source&facet=true&begin_date=20120101&end_date=20121231