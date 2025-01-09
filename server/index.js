const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const cors = require("cors");

const cloudinary = require("cloudinary");
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

const fileUpload = require("express-fileupload");
require("dotenv").config();
// const Enrollment = require("./routes/Enrollment");
// const UserRoute = require("./routes/UserRoute");
// const AdminRoute = require("./routes/adminRoutes");W
// const PaymentRoute = require("./routes/paymentRoute");
const error = require("./middlewares/error");
const { dbConnection } = require("./config/dbConnection");

// Add middleware
// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// File upload middleware
app.use(fileUpload());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookie());
app.use(cors(corsOptions));

// app.use("/api", UserRoute);
// app.use("/api", Enrollment);
// app.use("/api/admin", AdminRoute);
// app.use("/api/payment", PaymentRoute);
app.use(error);

// Database connection
dbConnection(process.env.URI);

// Start the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (promise, e, reason) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  console.log(`Shutting down server due to unhandledRejection`);
  console.log(`${e.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (e) => {
  console.log(`Error : ${e.message}`);
  console.log(`Shutting down server due to uncaughtException`);
  server.close(() => {
    process.exit(1);
  });
});
