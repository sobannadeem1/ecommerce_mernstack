const express = require("express");
const {
  categorypost,
  categoryfetch,
  categoryupdate,
  categorydelete,
} = require("../controller/categorycontroller");
const router = express.Router();

router.post("/categorypost", categorypost);
router.get("/categoryfetch", categoryfetch);
router.put("/categoryupdate/:id", categoryupdate);
router.delete("/categorydelete/:id", categorydelete);

module.exports = router;
