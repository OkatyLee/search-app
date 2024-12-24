const express = require('express');
const bodyParser = require('body-parser');
const { searchInvertedIndex } = require('./invertedIndex');

const app = express();

// Middleware для обработки POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Search Documents</h1>
                <form action="/search" method="POST">
                    <input type="text" name="query" placeholder="Enter search query" required>
                    <button type="submit">Search</button>
                </form>
            </body>
        </html>
    `);
});

// Маршрут для обработки поиска
app.post('/search', (req, res) => {
    const query = req.body.query;
    const results = searchInvertedIndex(query);
    res.send(`
        <html>
            <body>
                <h1>Search Results</h1>
                <ul>
                    ${results.map(doc => `<li>${doc.content}</li>`).join('')}
                </ul>
                <a href="/">Back</a>
            </body>
        </html>
    `);
});

module.exports = app;
