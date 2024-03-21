const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if(req.method === 'GET'){
        fs.readFile(path.join(__dirname, '../../public', '/index.html'), (err, data) => {
            if(err){
                res.writeHead(404);
                res.end("Not Found");
                return;
            }

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        })
    }
}