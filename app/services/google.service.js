const cheerio = require('cheerio');

class googleService {
    getPeopleAlsoAskQuestions({searchQuery, searchGoogleHtml}) {
        const $ = cheerio.load(searchGoogleHtml);
        const body = $('body').first(); 
        const peopleAlsoAskQuestions = [];
        body.find('div[class="fLtXsc iIWm4b"][aria-expanded="false"]').each((i, el) => {
            const text = $(el).text();
            if (text) peopleAlsoAskQuestions.push($(el).text());
        });
        return {
            searchQuery: searchQuery,
            peopleAlsoAskQuestions: peopleAlsoAskQuestions
        };
    }

}

module.exports = new googleService;