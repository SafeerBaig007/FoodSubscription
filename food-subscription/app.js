const express = require("express");
const bodyParser = require("body-parser");

const adminRoute = require("./routes/admin");
const menuRoute = require("./routes/menu");
const userRoute = require("./routes/user");
const invoiceRoute = require("./routes/invoice");
const subscriptionRoute = require("./routes/subscription");

const app = express();

const multiParty = require("connect-multiparty");

PORT = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(multiParty());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.post('/es',es.postesdata);

app.use("/images", express.static("./images"));

app.use("/api/admin", adminRoute);
app.use("/api/menu", menuRoute);
app.use("/api/user", userRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/subscription", subscriptionRoute);

app.listen(PORT, () => {
  console.log(`listing on http://127.0.0.1:${PORT}`);
});
