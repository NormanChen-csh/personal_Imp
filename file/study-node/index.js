var http = require('http')
var fs = require('fs')
var url = require('url')
const pug = require('pug');

var server = http.createServer(function(req, res) {
    console.log(url.parse(req.url,true))
    var urlObj = url.parse(req.url,true)
    if (urlObj.path == '/public') {
        fs.readdir('./public', function(err, files){
            var pugFile = pug.renderFile('./views/directyList.pug', {
                route: req.url,
                list: Array.from(files)
            });
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(pugFile)
        })
    } else {
        var pugFile = pug.renderFile('./views/404.pug')
        res.end(pugFile)
    }
})

server.listen(3100, function() {
    console.log('server is running on 3100')
})