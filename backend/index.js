require("dotenv").config();
const express = require("express");
const cors = require("cors");
// http://localhost:3000
// http://localhost:5000
// when from a url with port number (e.g.3000) a request is sent to a url with port number(e.g.5000) the browser knows this as a unsecure connection and block it. to solve this problem we will use cors module and then we can make a request from any url to any url(communication between frontend and backend).
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const usersRouter = require("./routes/users");
const returnStatus = require("./helpers/returnStatus");
// create an instance of express
const app = express();

app.use(express.json());
// middleware for parsing JSON bodies

app.use(cors());
// for allowing communication between FE and BE.

// apply route middlewares to these routes.
app.use("/users", usersRouter);
app.use("/doctors", doctorsRouter);
app.use("/patients", patientsRouter);

app.get("/", (req, res) => {
  res.send("Hi everyone");
});

//Error handling middleware for non-existing routes.
app.use((req, res, next) => {
  return returnStatus(res, 404, true, "Not Found");
});
// for security purpose we will use the code below instead of writing the port number itself.
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//routers are used to route to specific path
//controllers are used to deal with data fetching for those paths (signin _ sign out and ...)
