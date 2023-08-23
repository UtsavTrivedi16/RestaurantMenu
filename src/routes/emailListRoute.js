const emailListController = require('../controllers/emailListController');

module.exports = (req, res) => {
    //TODO: Change to POST
    if(req.method === 'GET' && req === "/emailList"){
        res.writeHead(200, {"Content-Type": "application/json"});
        //set the response
        res.write("Hi there, This is a Vanilla Node.js API");
        //end the response
        res.end();
    }
}