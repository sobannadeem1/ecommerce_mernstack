const {
  reviewcreate,
  getreview,
  getreviewbyid,
  deletereview,
  updatereview,
} = require("../controller/reviewcontroller");

const reviewroute = require("express").Router();

reviewroute.post("/reviewcreate", reviewcreate);
reviewroute.get("/getreview", getreview);
reviewroute.get("/getreviewbyid/:id", getreviewbyid);
reviewroute.delete("/deletereview/:id", deletereview);
reviewroute.put("/updatereview/:id", updatereview);

module.exports = reviewroute;
