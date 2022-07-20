const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('auth/register', { layout: 'layouts/layout-auth' });
});

router.post('/', async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    try {
        const userExist = await User.findOne({ userName: userName });
        const emailExist = await User.findOne({ email: email });
        if (userExist) {
            return res.render('auth/register', {
                message: 'Username sudah ada'
            });
        }

        if (emailExist) {
            return res.render('auth/register', {
                message: 'Email sudah ada'
            });
        }

        const user = new User({
            fullName: fullName,
            userName: userName,
            email: email,
            password: password,
        });

        bcrypt.hash(user.password, 10, async (err, hash) => {
            if (err) return res.status(500).send(err);
            user.password = hash;

            await user.save().then();
            res.setHeader("Content-Type", "text/html");
            res.render('auth/login', {
                message: 'Berhasil membuat user'
            });
            res.end();
        });
    } catch (err) {
        return res.status(500).send({
            error: 'Internal Server 500',
            err
        });
    }
});

module.exports = router;
