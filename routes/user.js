const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const user = require("../middlewares/request/user");

router.post("/signup", user.validateRegisterBody, controller.registerUser);
router.post("/login", user.validateLoginBody, controller.loginUser);
router.get("/", controller.index);
router.get("/:id", controller.show);
router.delete("/:id", controller.destroy);
router.put("/:id", user.validateUpdateBody, controller.update);

module.exports = router;
