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

app.post("/api/quotes", (req, res, next) => {
    const {person, quote} = req.query

    if(person && quote) {
        const newQuote = {person, quote};
        quotes.push(newQuote)
        res.status(201).send({quote: newQuote})
    } else {
        res.status(400).send({error: "Both person and quote are required"})
    }
});