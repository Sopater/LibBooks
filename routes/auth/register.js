var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('auth/register', { layout: 'layouts/layout-auth' });
});

module.exports = router;
