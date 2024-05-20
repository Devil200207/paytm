const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const app = express();

// middlewares  q
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1',rootRouter);

// listing on port 3000
app.listen(3000);