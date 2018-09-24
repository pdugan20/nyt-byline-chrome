var feed = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';
$.ajax(feed, {
	accepts:{
		xml:'application/rss+xml'
	},
	dataType:'xml',
	success:function(data) {
		$(data).find('item').each(function () {
			var el = $(this);
			var url = el.find("link").text();
			if (url.indexOf("opinion") != -1) { 
				// skip because opinion articles contain bylines
			} else {
				url = url.split('?')[0];
				// url = url.match(/https:\/\/[^\/]+([^\?]+)/)[1];
				var author_string = el.find('dc\\:creator').text().toLowerCase();

				var split_string = author_string.toLowerCase().split(' ');
				for (var i = 0; i < split_string.length; i++) {
					if (split_string[i] == 'and') {
						split_string[i] = split_string[i].charAt(0) + split_string[i].substring(1);
					} else {
						split_string[i] = split_string[i].charAt(0).toUpperCase() + split_string[i].substring(1);
					}  
				}
			    author_string = split_string.join(' ');
				var url_search_query = 'a[href*=' + '"' + url + '"' + ']';
				var story_wrapper = $(url_search_query);
				console.log(story_wrapper);
				story_wrapper.append('<div class="story_byline">' + author_string + '</div>');
			}
		});
	}	
});