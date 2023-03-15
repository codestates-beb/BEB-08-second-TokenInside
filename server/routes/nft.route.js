const exrpess = require("express");
const router = exrpess.Router();

const controller = require("../controllers/nft.controller");

router.post("/minting", controller.minting_post);
router.get("/market", controller.market_get);

module.exports = router;
