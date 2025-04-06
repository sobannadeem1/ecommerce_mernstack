const {
  addtocart,
  getcartbyid,
  deletecart,
} = require("../controller/cartcontroller");

const cartroute = require("express").Router();

cartroute.post("/addtocart", addtocart);
cartroute.get("/getcartbyid/:userId", getcartbyid);
cartroute.delete("/deletecart/:id", deletecart);

module.exports = cartroute;
