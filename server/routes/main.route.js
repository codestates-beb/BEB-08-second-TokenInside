const exrpess = require('express');
const router = exrpess.Router();

const controller = require('../controllers/main.controller');

router.get('/', controller.main_get);
router.get('/dummy', controller.dummy_get);

module.exports = router;
