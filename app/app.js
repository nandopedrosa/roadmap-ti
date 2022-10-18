require('express-async-errors');

const express = require('express');
const app = express();

// Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(helmet());
app.use(cors());
app.use(xss());

//App setup
app.use(express.static('./public'));
app.use(express.json());

//Views
const viewsDisciplina = require('./disciplina/views.js');
app.use('/disciplina', viewsDisciplina);
const viewsAssunto = require('./assunto/views.js');
app.use('/assunto', viewsAssunto);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();