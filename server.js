let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
let logger = require("morgan");

let cheerio = require("cheerio");
let axios = require("axios");

let PORT = 8080;

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

let app = express();

app.use(logger("dev"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost",{
	useMongoClient: true
});


app.get("/retrieve", function(req, res){
	axios.get("https://www.cnbc.com/finance")
	.then(function(response){
		var $ = cherrio.load(response.data);

		$(".cnbc-contents").each(function(i, element){
			var result = {};

			result.title = $(this)
			.children("a")
			.text ();
		result.link = $(this)
		    .children("a")
		    .attr("href");
		db.Article.create(result)
			.then(function(dbArticle){
				console.log(dbArticle);

			})  
		.catch(function(err){
			return res.json(err);
		});	  	
	});
		res.send("Completed the retrival")

	});
});

app.listen(PORT, function(){
	console.log("App running on port "+ PORT+ "!");
})
