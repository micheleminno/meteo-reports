const app = require('./app.js');

const port = process.env.DEV_APP_PORT || process.env.PORT

app.listen(port, () => {

    console.log(`Your server is running on port ${port}`);
});