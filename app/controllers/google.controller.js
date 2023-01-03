const respond =  require("../services/respond.service");
const axios = require('axios');
const fs = require('fs/promises');
const googleService = require('../services/google.service');

class googleController {
    index(req, res) {
        let searchQuery = req.query.q;
        searchQuery = searchQuery.replace(/ /g, '+');
        axios.get(`https://www.google.com/search?q=${searchQuery}&gl=us&hl=en`)
            .then((reponse) => {
                fs.writeFile(`${process.cwd()}/output/index.html`, reponse.data)
                const searchGoogleHtml = reponse.data;
                const result = googleService.getPeopleAlsoAskQuestions(searchGoogleHtml);
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
                respond({res, statusCode: 500, message: "Internal server error"});    
            })
    }
};

module.exports = new googleController;
