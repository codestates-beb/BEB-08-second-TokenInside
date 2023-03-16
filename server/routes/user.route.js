const exrpess = require("express");
const router = exrpess.Router();

const controller = require("../controllers/user.controller");

router.post("/join", controller.join_post);
router.post("/login", controller.login_post);
router.post("/transfer", controller.transfer_post);
router.get("/faucet", controller.faucet_get);
router.get("/mypage", controller.mypage_get);

module.exports = router;
