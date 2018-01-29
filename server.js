
const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const axios = require("axios");

const bodyParser = require("body-parser");
const logger = require("morgan");

const mongoose = require("mongoose");
const PORT = 8080;
const db = require("./models");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cycleNews",{
	useMongoClient: true
});


app.get("/retrieve",function(req,res){
	axios.get("http://www.velonews.com/category/news/").then(function(response) {
		const $ = cheerio.load(response.data);
		
		$("h3.article__title").each(function(i, element){
			const result = {};
			result.title = $(this)
				.text().trim();

			result.link = $(this)
				.children()
				.attr("href");	
			//const summary = $(element).children().attr("p.article__excerpt");
			db.Article.create(result)
				.then(function(dbArticle){
					console.log(dbArticle);
				})
				.catch(function(err){
					return res.json(err);
				});

			});
		res.send("Retrieval Complete")
		});
	});

app.get("/articles", function(req,res){
	db.Article.find({})
	.then(function(dbArticle){
		res.json(dbArticle);
	})
	.catch(function(err){
		res.json(err)

	});	
});




app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});