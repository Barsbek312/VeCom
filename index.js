const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

// require('./dotenv').config();

const loginRoute = require("./routes/auth/login");
const meRoute = require("./routes/auth/me");
const registerRoute = require("./routes/auth/register");
const verifyRoute = require("./routes/auth/verify")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(registerRoute);
app.use(loginRoute);
app.use(meRoute);
app.use(verifyRoute);

app.use(express.static("Shishka/build"));
app.get("*", (req, res) => {
    const myPath = path.resolve(__dirname, "Shishka", "build", "index.html");
    return res.sendFile(myPath);
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening port ${PORT}`))