const fs = require('fs');

module.exports = (req, res) => {
    const rs = fs.createReadStream(__dirname + '../../../public' + req.url);
    // TODO: Switch case content-type. Not needed but good practice as diff browsers may react differently
    res.writeHead(200);
    rs.pipe(res);
}