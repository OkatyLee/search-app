const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
