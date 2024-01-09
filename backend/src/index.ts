import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello TS Node Dev</h1>")
});

app.listen(PORT, () => {
    console.log("Port is listening on port " + PORT);
});