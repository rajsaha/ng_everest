const express = require('express');
const router = express.Router();
const ResourceGet = require('../../../services/resource/get');
const ResourceDelete = require('../../../services/resource/delete');
const ResourceShare = require('../../../services/resource/share');
const ResourceEdit = require('../../../services/resource/edit');
const checkIfAuthenticated = require('../../../services/auth/checkIfAuthorized');

// * Get calls
router.post('/get/all', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceGet.getAllResources(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/get/four-images-for-collection', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceGet.getFourImages(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.get('/get/one/:id', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceGet.getResource(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

// * Delete calls
router.post('/delete', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceDelete.deleteResource(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

// * Share calls
router.post('/get-opengraph-data', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceShare.getOpenGraphData(req.body.url);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/share-resource', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceShare.shareResource(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

// * Edit calls
router.post('/edit/remove-tag', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceEdit.removeTag(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/edit', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceEdit.editResource(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

router.post('/edit-resource-collection', checkIfAuthenticated, async (req, res, next) => {
    try {
        const response = await ResourceEdit.editResourceCollection(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

module.exports = router;