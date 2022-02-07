const express = require('express');
const router = express.Router();

const historyController = require('../Controllers/HistoryController');

router.post('/create', historyController.create);

router.get('/list/:_id', historyController.list);

router.put('/update', historyController.update);

router.delete('/delete/:_id', historyController.delete);

module.exports = router;