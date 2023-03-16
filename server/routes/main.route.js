const exrpess = require("express");
const router = exrpess.Router();

const controller = require("../controllers/main.controller");

router.get("/", controller.main_get);
router.get("/test", controller.test_get);

module.exports = router;
