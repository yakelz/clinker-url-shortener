const Router = require('express').Router;
const router = new Router();
const urlController = require('./controllers/urlController');

router.post('/api/shorten', urlController.shorten);
router.post('/api/getUserUrls', urlController.getUserUrls);
router.get('/:shortId', urlController.redirect);

module.exports = router;
