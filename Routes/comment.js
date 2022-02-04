const express = require('express');
const router = express.Router();

const commentController = require('../Controllers/CommentController');

router.post('/create', commentController.create);

router.get('/list/:_id', commentController.list);

router.put('/update', commentController.update);

router.post('/search', commentController.search);

router.delete('/delete/:_id', commentController.delete);

router.get('/detail/:_id', commentController.detail);

module.exports = router;