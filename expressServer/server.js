require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const getAuthService = require("./services/authService");
const reminderRoutes = require("./routes/reminderRoute");
const subcriptionRoutes = require("./routes/subscriptionRoute");
const userDataRoutes = require("./routes/userDataRoute");
//const userParkingRoutes = require("./routes/userParkingRoute");

const PORT = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public"));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://subtrack-psi.vercel.app/"],
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const getCheckJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `${process.env.AUTH0_AUD}`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to root URL of Server");
});
//Connect to db
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB SubTrack DB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
//---
// Swagger Setup
// CDN CSS
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SubTrack",
      version: "1.0.0",
      description:
        "A web API with Swagger documentation for the Subscription Management Application",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server(local)",
      },
      {
        url: "https://sub-track-backend-server.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to API documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

//----

//app.use("/api", wpaPaystationRoutes);
// app.use("/api", getCheckJwt, wpaPaystationRoutes);
app.use("/api", subcriptionRoutes);
app.use("/api", userDataRoutes);
app.use("/api", reminderRoutes);
// Server listening on a port

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

////
const cron = require("node-cron");
const nodemailer = require("nodemailer");

// ...

console.log(new Date());

////
module.exports = app;
