const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/user.route");
const productRouter = require("./routers/product.route");
const ApiError = require("./api-error");

const app = express(); 
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application."});
});
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});



module.exports = app;