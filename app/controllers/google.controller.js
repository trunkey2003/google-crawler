const respond = require("../services/respond.service");
const axios = require("axios");
// const fs = require('fs/promises');
const googleService = require("../services/google.service");

class googleController {
  peopleAlsoAskQuestions(req, res) {
    try {
      let searchQuery = req.query.searchQuery;
      if (!searchQuery)
        return respond({ res, statusCode: 400, message: "Bad request" });
      const q = searchQuery.replace(/ /g, "+");
      axios
        .get(`https://www.google.com/search?q=${q}&gl=us&hl=en`)
        .then((reponse) => {
          // fs.writeFile(`${process.cwd()}/output/index.html`, reponse.data)
          const searchGoogleHtml = reponse.data;
          const result = googleService.getPeopleAlsoAskQuestions({
            searchQuery,
            searchGoogleHtml,
          });
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          respond({ res, statusCode: 500, message: "Internal server error" });
        });
    } catch {
      console.log(err);
      respond({ res, statusCode: 500, message: "Internal server error" });
    }
  }
}

module.exports = new googleController();
