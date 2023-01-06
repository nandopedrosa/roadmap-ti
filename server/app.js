require('express-async-errors');

const express = require('express');
const app = express();

// Security
app.set('trust proxy', 1);

const rateLimiter = require('express-rate-limit');
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

const helmet = require('helmet');
app.use(helmet());

const cors = require('cors');
app.use(cors());

const xss = require('xss-clean');
app.use(xss());

//App setup
app.use(express.json());

//Views
const viewsDisciplina = require('./disciplina/views.js');
app.use('/api/disciplina', viewsDisciplina);
const viewsAssunto = require('./assunto/views.js');
app.use('/api/assunto', viewsAssunto);

const port = process.env.PORT || 3001;

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