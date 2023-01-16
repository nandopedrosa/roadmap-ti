const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.route('/login').post((req, res) => {
    service.login(req).then((v) => {
        res.send(v);
    });
});

router.route('/signup').post((req, res) => {
    service.signup(req).then((v) => {
        res.send(v);
    });
});

router.route('/is-logged-in').get((req, res) => {
    service.isLoggedIn(req).then((result) => {
        res.send(result);
    });
});

module.exports = router;