

const cheerio = require("cheerio");
const request = require("request");

const axios = require("axios");


axios.get("http://www.velonews.com/category/news/").then(function(response) {
	const $ = cheerio.load(response.data);
	const results = [];
	$("h3.article__title").each(function(i, element){
		const title = $(element).text().trim();
		//const summary = $(element).children().attr("p.article__excerpt");
		const link = $(element).children().attr("href");

		results.push({
			title: title,
			//summary: summary,
			link: link
		});
	});
console.log(results);
});


