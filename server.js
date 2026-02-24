const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello Chandu 🔥 Version 2 Running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});