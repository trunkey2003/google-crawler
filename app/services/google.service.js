const cheerio = require('cheerio');

class googleService {
    getPeopleAlsoAskQuestions(googleSearchHtml) {
        const $ = cheerio.load(googleSearchHtml);
        const body = $('body').first(); 
        const peopleAlsoAskQuestions = [];
        body.find('div[class="fLtXsc iIWm4b"]').each((i, el) => {
            const text = $(el).text();
            if (text) peopleAlsoAskQuestions.push($(el).text());
        });
        return {
            peopleAlsoAskQuestions: peopleAlsoAskQuestions
        };
    }

}

module.exports = new googleService;