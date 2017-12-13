var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'TOKEN' });
dbx.filesListFolder({ path: '' })
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

dbx.filesUpload({ path: '/hello.js', contents: 'hello world'})
	.then(function (response) {
		// var results = document.getElementById('results');
		// results.appendChild(document.createTextNode('File uploaded!'));
		console.log(response);
	})
	.catch(function (error) {
		console.error(error);
	});
