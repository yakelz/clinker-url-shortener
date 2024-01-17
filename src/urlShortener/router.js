const Router = require('express').Router;
const router = new Router();
const urlController = require('./controllers/urlController');

router.post('/shorten', urlController.shorten);
router.post('/getUserUrls', urlController.getUserUrls);
router.get('/:shortId', urlController.redirect);

module.exports = router;
