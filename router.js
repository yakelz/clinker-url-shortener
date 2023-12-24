const Router = require('express').Router;
const router = new Router();
const urlController = require('./controllers/urlController');

router.get('/', urlController.getAllUrls);
router.post('/shorten', urlController.shorten);
router.get('/:shortId', urlController.redirect);

module.exports = router;
