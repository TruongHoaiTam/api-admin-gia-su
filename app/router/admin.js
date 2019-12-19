const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const TagModel = require('../model/tag');
const ContractModel = require('../model/contract');


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ ...req.user._doc })
});

router.get('/tag', async (req, res) => {
    const result = await TagModel
        .find({})
        .sort('tag')

    res.status(200).json(result);
})

router.post('/tag', async (req, res) => {
    const find = await TagModel.findOne({ tag: req.body.tag })
    if (find === null) {
        res.status(200).json(req.body);
        return new TagModel(req.body).save();
    } else {
        return res.status(400).json(req.body);
    }
})

router.delete('/tag', async (req, res) => {
    const find = await TagModel.findOne({ tag: req.body.tag })
    if (find !== null) {
        res.status(200).json(req.body);
        return TagModel.deleteOne({ _id: find._id });
    } else {
        return res.status(400).json(req.body);
    }
})

router.post('/contract', async (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body);
    return new ContractModel(req.body).save();
})

module.exports = router;

