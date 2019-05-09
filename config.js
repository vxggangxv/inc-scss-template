module.exports = function() {

	var source       = 'src',
		development  = 'dist',
		remove       = ['.sass-cache', 'dist'],

		// 템플릿 경로
		template = {
			src  : source + '/template/**/!(_)*.html',
			parts: source + '/template/**/_*.html',
			dest : development + '/views',
			src_m  : source + '/template_m/**/!(_)*.html',
			parts_m : source + '/template_m/**/_*.html',
			dest_m : development + '/views_m'
		},

		// Sass 경로
		sass = {
			src : source + '/sass/**/*.{scss,sass}',
			// src       : source + '/sass/**',
			dest: development + '/static/css'
		},

		// Css 경로
		css = {
			src : source + '/css/**/*.css',
			// src : source + '/css/**',
			dest: development + '/static/css'
		},

		// JS 경로
		js = {
			src : source + '/js/**/*.js',
			// src : source + '/js/**',
			dest: development + '/static/js'
		},

		// HTML 옵션
		htmlbeautify = {
			"indentSize": 4
		};

	return {
		del  : remove,
		src  : source,
		dev  : development,
		
		template : template,
		sass : sass,
		js   : js,

		htmlbeautify : htmlbeautify
	};
};