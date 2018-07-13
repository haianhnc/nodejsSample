var http = require('http');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');

var dt = require('./myDateTime');
var mailer = require('./mailer');

http.createServer(function (req, res) {
  if(req.url == '/sendmail') {
    mailer.transportMail();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('sending...');
    return res.end();
  } else {
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        if(!files.uploaded) {
          res.write('no file to upload');
          res.end();
        } else {
          var oldpath = files.filetoupload.path;
          var newpath = '/Users/haianhnc/io/' + files.filetoupload.name;
          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            return res.end();
          });
        }
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
    }
  }
}).listen(8081);

