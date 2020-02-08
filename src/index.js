const express = require('express');
const app = express();
const morgan = require('morgan');

require('../src/database.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: "Welcome to API"
    })
})

const router = require('./router.js');
app.use('/api/v1', router);

const {
    notFound,
    serverError
} = require('../src/middlewares/exceptionHandler.js')

app.use(notFound);
app.use(serverError);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started at ${Date()}`)
    console.log(`Server started on port ${port}!`)
})

module.exports = app;