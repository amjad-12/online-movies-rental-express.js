const winston = require("winston/lib/winston/config")

function error(err, req, res, next){
    res.status(500).send('Something failed')
}

module.exports = error