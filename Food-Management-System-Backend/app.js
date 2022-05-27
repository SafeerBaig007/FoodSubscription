const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./server/routes/auth");
const userRoutes = require("./server/routes/users")
const dishesRoutes = require("./server/routes/dishes");
const subscribeRoutes = require("./server/routes/subscribers")
const invoiceRoutes = require("./server/routes/invoices")
const cors = require("cors");

// Set up the express app
const app = express();
app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use(express.static(__dirname + "/public"));
app.use("/server/images", express.static("server/images"));

app.use("/api", authRoutes);
app.use("/api", userRoutes)
app.use("/api/dishes", dishesRoutes);
app.use("/api", subscribeRoutes);
app.use("/api", invoiceRoutes)




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on: " + port);
});
// module.export = upload

module.exports = app ;
