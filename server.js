
const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const axios = require("axios");

const db = require("./models");
const PORT = 8080;
const app = express();



app.get("/retrieve",function(req,res){
	axios.get("http://www.velonews.com/category/news/").then(function(response) {
		const $ = cheerio.load(response.data);
		
		$("h3.article__title").each(function(i, element){
			const result = {};
			result.title = $(this)
				.text();
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








app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});