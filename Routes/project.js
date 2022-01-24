const express = require('express');
const router = express.Router();

const projectController = require('../Controllers/ProjectController');

router.post('/create', projectController.create);

router.get('/list', projectController.list);

router.put('/update', projectController.update);

router.post('/search', projectController.search);

router.delete('/delete/:_id', projectController.delete);

router.get('/detail/:_id', projectController.detail);

module.exports = router;