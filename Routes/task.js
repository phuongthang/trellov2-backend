const express = require('express');
const router = express.Router();

const taskController = require('../Controllers/TaskController');

router.post('/create', taskController.create);

router.get('/list/:_id', taskController.list);

router.put('/update', taskController.update);

router.post('/search', taskController.search);

router.delete('/delete/:_id', taskController.delete);

router.get('/detail/:_id', taskController.detail);

module.exports = router;