const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
});

app.get("/api/quotes/random", (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get("/api/quotes", (req, res, next) => {
    const personQuery = req.query.person;
    const filteredQuotes = quotes.filter(quote => quote.person === personQuery);
    if(personQuery) {
        res.send({quotes: filteredQuotes});
    } else {
        res.send({quotes: quotes});
    }
});