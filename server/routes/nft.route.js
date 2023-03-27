const exrpess = require('express');
const router = exrpess.Router();

const controller = require('../controllers/nft.controller');

router.post('/minting', controller.minting_post);

module.exports = router;
