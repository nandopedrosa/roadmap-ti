const express = require('express');
const router = express.Router();
const serviceDisciplina = require('../disciplina/service.js');
const serviceAssunto = require('../assunto/service.js');

router.route('/cards').get((req, res) => {
    let cards = [];
    serviceDisciplina.getCardsDisciplinas().then((cards) => {
        res.send(cards);
    });
});

module.exports = router;