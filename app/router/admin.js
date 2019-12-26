const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const TagModel = require('../model/tag');
const ContractModel = require('../model/contract');
var mongoose = require('mongoose');



router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ ...req.user._doc })
});

router.get('/tag', async (req, res) => {
    const result = await TagModel
        .find({})
        .sort('tag')

    res.status(200).json(result);
})

router.get('/contract', async (req, res) => {
    const result = await ContractModel
        .find({})

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

router.put('/contract/complaint/admin', async (req, res) => {
    let contract = await ContractModel.findOne({ id: req.body.id });

    let option = { status: 'finished' };
    contract.status = 'finished';

    await ContractModel.updateOne({ id: req.body.id }, option).then(() => {
        return res.status(200).json(contract);
    })
})

router.post('/contract', async (req, res) => {
    req.body.status = 'still validate';
    res.status(200).json(req.body);
    return new ContractModel(req.body).save();
})

router.put('/contract/status', async (req, res) => {
    const option = (req.body.status === 'still validate') ? { status: 'forced terminate' } : { status: 'still validate' };
    const contract = await ContractModel.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });
    contract.status = 'forced terminate';
    await ContractModel.updateOne({ _id: mongoose.Types.ObjectId(req.body._id) }, option).then(() => {
        return res.status(200).json(contract);
    })
})

router.put('/contract/status/admin', async (req, res) => {
    let contract = await ContractModel.findOne({ id: req.body.id });

    let option;
    if (req.body.pending_complaint === true) {
        option = { status: 'pending complaint' };
        contract.status = 'pending complaint';
    } else {
        option = (req.body.status === 'still validate') ? { status: 'finished' } : { status: 'still validate' };
        contract.status = 'finished';
    }

    await ContractModel.updateOne({ id: req.body.id }, option).then(() => {
        return res.status(200).json(contract);
    })
})

router.delete('/contract', async (req, res) => {
    await ContractModel.deleteOne({ _id: mongoose.Types.ObjectId(req.body._id) });
    return res.status(200).json(req.body);
})


module.exports = router;

