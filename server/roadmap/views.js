const express = require('express');
const router = express.Router();
const serviceDisciplina = require('../disciplina/service.js');
const serviceAssunto = require('../assunto/service.js');

router.route('/:idDisciplina').get((req, res) => {
    serviceDisciplina.getById(req).then((disciplina) => {
        serviceAssunto.getAll(req).then((assuntos) => {
            const result = { disciplina: disciplina, assuntos: assuntos };
            res.send(result);
        });
    });
});

module.exports = router;