const express = require('express');
const router = express.Router();
const service = require('./service.js');


router.route('/create').post((req, res) => {
    service.create(req).then((v) => {
        res.send(v);
    });
});

router.route('/update').post((req, res) => {
    service.update(req).then((v) => {
        res.send(v);
    });
});

router.route('/reorder').post((req, res) => {
    service.reorder(req).then((v) => {
        res.send(v);
    });
});


router.route('/list/:idDisciplina').get((req, res) => {
    service.getAll(req).then((result) => {
        res.send(result);
    });
});


router.route('/:id').get((req, res) => {
    service.getById(req).then((result) => {
        res.send(result);
    });
});

router.route('/delete').post((req, res) => {
    service.del(req).then((v) => {
        res.send(v);
    });
});


module.exports = router;