var feed = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
$.ajax(feed, {
	accepts:{
		xml:"application/rss+xml"
	},
	dataType:"xml",
	success:function(data) {
		$(data).find("item").each(function () {
			var el = $(this);
			var url = el.find("link").text();
			var author_string = el.find("dc\\:creator").text();
			console.log(url);
			console.log(author_string)
		});
	}	
});