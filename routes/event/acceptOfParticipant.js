const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.post("/sendAccept", async (req, res) => {

    const {access} = req.cookies;
    const { dataOfUser } = req.body;

    const body = JSON.stringify(dataOfUser);

    try {
        const apiResAddToParticipants = await fetch("http://127.0.0.1:8000/participation_in_events/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${access}`
            },
            body
        })


        const data = await apiResAddToParticipants.json();

        
        return res.status(apiResAddToParticipants.status).json(data);


        
    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when trying to send accept to participant"
        })
    }
})


module.exports = router;