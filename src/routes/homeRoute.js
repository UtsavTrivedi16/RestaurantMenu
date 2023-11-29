module.exports = (req, res) => {
    if(req.method === 'GET'){
        res.writeHead(200, {"Content-Type": "application/json"});
        //set the response
        res.write("Hi there, This is the home page");
        //end the response
        res.end();
    }
}