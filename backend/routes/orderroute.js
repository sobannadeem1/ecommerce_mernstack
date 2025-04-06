const {
  createorder,
  getorderbyuserid,
  getallorders,
  updateorder,
  deleteorder,
} = require("../controller/ordercontroller");

const orderroute = require("express").Router();

orderroute.post("/ordercreate", createorder);
orderroute.get("/getorderbyuser/:userId", getorderbyuserid);
orderroute.get("/getallorders", getallorders);
orderroute.put("/updateorder/:id", updateorder);
orderroute.delete("/deleteorder/:id", deleteorder);

module.exports = orderroute;
