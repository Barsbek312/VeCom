const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/getAcceptedParticipants", async (req, res) => {

    const {access} = req.cookies;

    try {
        
        const apiRes = await fetch("http://127.0.0.1:8000/participation_in_events/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${access}`,
            }
        })

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when trying to get accepted participants"
        })
    }
})

module.exports = router