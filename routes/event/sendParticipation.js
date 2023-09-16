const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.post("/sendTheParticipation", async (req, res) => {
    const {linkOfUser, linkOfEvent, organization} = req.body;
    const {access} = req.cookies;

    const body = JSON.stringify({
        user: linkOfUser, 
        event: linkOfEvent,
        organization: organization,
        read: false,
    });

    console.log(body);

    try {
        const apiRes = await fetch("http://127.0.0.1:8000/waitingForParticipationInEvent/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`  
            },
            body,
        })

        console.log(apiRes);

        const apiResData = await apiRes.json();

        console.log(apiResData)

        return res.status(apiRes.status).json(apiResData)

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong when trying to sent paricipation"
        });
    }
})

module.exports = router;