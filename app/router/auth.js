const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const passport = require('../../app/config/passport');
const AdminModel = require('../model/admin');


router.post('/create-admin', async (req, res) => {
    await AdminModel.findOne({ username: req.body.username })
        .then(async result => {
            if (result == null) {
                const user = {
                    ...req.body,
                    password: md5(req.body.password),
                    avatar: (req.body.avatar !== undefined && req.body.avatar !== "undefined") ? req.body.avatar : "uploads\\no-avatar.jpg"
                };
                res.status(200).json(user);
                return new AdminModel(user).save();
            }
            return res.status(404).send('Đăng ký thất bại');
        })
});

router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Đăng nhập thất bại',
                user
            });
        }
        req.login(user, { session: false }, async (error) => {
            if (error) {
                res.send(error);
            }
            const _user = {
                ...user,
                avatar: undefined
            }
            const token = await jwt.sign({ _user }, 'your_jwt_secret');
            return res.status(200).json({ user, token });
        });
        return null;
    })(req, res);
});

module.exports = router;





