const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('auth/login', { layout: 'layouts/layout-auth' });
});

router.post('/', async (req, res) => {
    const { userName, password } = req.body;

    await User.findOne({ userName: userName }).then((user) => {
        if (!user) {
            return res.status(404).send({
                message: 'username not found',
            });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).send(err);
            else if (result) {
                return res.redirect('/');
            }
            return res.render('auth/login', {
                message: 'Password Salah'
            });
        });
    }).catch((err) => {
        return res.status(500).send({
            message: 'Internal Server Error',
            error: err
        })
    });
})

module.exports = router;
