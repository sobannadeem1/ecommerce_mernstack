const {
  createProduct,
  getproducts,
  getproductsbyid,
  deleteProduct,
  updateproduct,
} = require("../controller/productcontroller");
const upload = require("../middleware/multer");

const routes = require("express").Router();

routes.post("/productcreate", upload.single("image"), createProduct);
routes.get("/productfind", getproducts);
routes.get("/productfind/:id", getproductsbyid);
routes.delete("/productdelete/:id", deleteProduct);
routes.put("/productupdate/:id", updateproduct);

module.exports = routes;
