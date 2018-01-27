

const cheerio = require("cheerio");
const request = require("request");


request("http://www.velonews.com/category/news/", function(error, response, html){
	const $ = cheerio.load(html);
	const results = [];
	$("h3.article__title").each(function(i, element){
		const title = $(element).text().trim();
		const link = $(element).children().attr("href");

		results.push({
			title: title,
			link: link
		});
	});
console.log(results);
});


