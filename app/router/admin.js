const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const UserModel = require('../model/user');
const TagModel = require('../model/tag');


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ ...req.user._doc })
});

router.get('/user-list', async (req, res) => {
    const result = await UserModel
        .find({})
        .sort('username')

    res.status(200).json(result);
})

router.get('/tag-list', async (req, res) => {
    const result = await TagModel
        .find({})
        .sort('tag')

    res.status(200).json(result);
})

router.post('/tag', async (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body);
    return new TagModel(req.body).save();
})

router.delete('/tag', async (req, res) => {
    console.log(req.body)

    res.status(200).json(req.body);
    return TagModel.deleteOne({ tag: req.body.tag });
})

module.exports = router;

