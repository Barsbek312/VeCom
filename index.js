const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

// require('./dotenv').config();

const loginRoute = require("./routes/auth/login");
const meRoute = require("./routes/auth/me");
const registerRoute = require("./routes/auth/register");
const verifyRoute = require("./routes/auth/verify");
const activateRoute = require("./routes/auth/activation");
const logoutRoute = require("./routes/auth/logout");
const sendEvent = require("./routes/event/sendEvent");
const sendParticipation = require("./routes/event/sendParticipation");
const getEventsInHome = require("./routes/events/getEventsInHome");
const getClickedEvent = require("./routes/event/getClickedEvent");
const getEventsOfOrg = require("./routes/events/getEventsOfOrg");
const acceptOfParticipant = require("./routes/event/acceptOfParticipant");
const rejectOfParticipant = require("./routes/event/rejectOfParticipant");
const sendRecruitment = require("./routes/event/sendTheRecruitment");
const acceptAll = require("./routes/event/sendAcceptAll");
const sendView = require("./routes/event/sendView");
const sendLike = require("./routes/event/sendLike");
const sendDeleteLike = require("./routes/event/sendDeleteLike");
const getProfileOfOrg = require("./routes/profile/getProfileOfOrg");
const changeDescriptionOfVol = require("./routes/profile/changeDescriptionOfVol");
const changeAvaOfVol = require("./routes/profile/changeAvaOfVol");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(loginRoute);
app.use(activateRoute);
app.use(logoutRoute)
app.use(meRoute);
app.use(registerRoute);
app.use(verifyRoute);
app.use(sendParticipation);
app.use(getEventsInHome);
app.use(getEventsOfOrg);
app.use(sendEvent);
app.use(getClickedEvent);
app.use(acceptOfParticipant);
app.use(rejectOfParticipant);
app.use(sendRecruitment);
app.use(acceptAll);
app.use(sendView);
app.use(sendLike);
app.use(sendDeleteLike);
app.use(getProfileOfOrg);
app.use(changeDescriptionOfVol);
app.use(changeAvaOfVol);

app.use(express.static("Shishka/build"));
app.get("*", (req, res) => {
    const myPath = path.resolve(__dirname, "Shishka", "build", "index.html");
    return res.sendFile(myPath);
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening port ${PORT}`))