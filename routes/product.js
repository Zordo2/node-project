const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product");
router.get("/", productControllers.getAll);
router.post("/", productControllers.add);
router.get("/:productId", productControllers.getOne);
router.patch("/:productId", productControllers.update);
router.delete("/:productId", productControllers.delete);
module.exports = router;
