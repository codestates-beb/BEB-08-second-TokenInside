const exrpess = require("express");
const router = exrpess.Router();

const controller = require("../controllers/post.controller");

router.post("/register", controller.register_post);
router.get("/detail", controller.detail_get);

module.exports = router;
