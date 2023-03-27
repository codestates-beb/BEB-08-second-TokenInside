const exrpess = require('express');
const router = exrpess.Router();

const controller = require('../controllers/user.controller');

router.post('/join', controller.join_post);
router.post('/login', controller.login_post);
router.post('/faucet', controller.faucet_post);
router.get('/mypage', controller.mypage_get);
router.post('/transfer', controller.transfer_post);

module.exports = router;
