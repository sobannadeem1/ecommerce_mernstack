require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/route");
const cors = require("cors");
const connection = require("./config/configdb");
const router = require("./routes/categoryroutes");
const routes = require("./routes/productroute");
const reviewroute = require("./routes/reviewroute");
const cartroute = require("./routes/cartroute");
const orderroute = require("./routes/orderroute");
const cloudinary = require("cloudinary").v2;

const port = process.env.PORT || 8000;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();
cloudinary.config({
  cloud_name: `${process.env.CLOUDNAME}`,
  api_key: `${process.env.APIKEY}`,
  api_secret: `${process.env.APISECRET}`,
});
app.use("/user", route);
app.use("/category", router);
app.use("/product", routes);
app.use("/review", reviewroute);
app.use("/cart", cartroute);
app.use("/order", orderroute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
