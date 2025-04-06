const router = require("express").Router();
const {
  signup,
  login,
  getuserprofile,
} = require("../controller/usercontroller");
const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/tokenverify");

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getuserprofile);

module.exports = router;
